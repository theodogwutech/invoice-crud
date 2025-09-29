import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as Handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as FormData from 'form-data';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly appConfig: AppConfig) {}

  /**
   * Send an email using a specified template and context
   * @param to Recipient email address
   * @param subject Email subject
   * @param templateName Name of the template file (without extension)
   * @param context Data for rendering the email template
   */
  async sendEmail({
    to,
    subject,
    templateName,
    context,
  }: {
    to: string;
    subject: string;
    templateName: string;
    context: Record<string, any>;
  }): Promise<void> {
    try {
      const html = await this.renderTemplate(templateName, context);

      const formData = new FormData();
      formData.append('from', this.appConfig.mailgun_from);
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('html', html);

      const response = await axios.post(
        `https://api.mailgun.net/v3/${this.appConfig.mailgun_domain}/messages`,
        formData,
        {
          auth: {
            username: 'api',
            password: this.appConfig.mailgun_api_key,
          },
          headers: formData.getHeaders(),
        },
      );

      this.logger.log(
        `Email sent successfully to ${to}: ${response.data.message}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${to}: ${error.response?.data?.message || error.message}`,
      );
      throw new Error(`Could not send email to ${to}. Please try again later.`);
    }
  }

  /**
   * Render an email template with the provided context
   * @param templateName Name of the template file (without extension)
   * @param context Data for rendering the template
   * @returns The rendered email content
   */
  private async renderTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    try {
      const templatePath = path.join(
        __dirname,
        '../../../templates/emails',
        `${templateName}.hbs`,
      );
      const templateContent = await fs.readFile(templatePath, 'utf8');

      const template = Handlebars.compile(templateContent);
      return template(context);
    } catch (error) {
      this.logger.error(
        `Error rendering template '${templateName}': ${error.message}`,
      );
      throw new Error(`Failed to render email template: ${templateName}`);
    }
  }
}
