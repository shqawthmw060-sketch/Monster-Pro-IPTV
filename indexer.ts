import { google } from 'googleapis';
import path from 'path';

// تحديد مسار ملف المفتاح السري المرفوع في مشروعك
const KEY_FILE_PATH = path.join(process.cwd(), 'google-credentials.json');

// إعداد الصلاحيات المطلوبة للاتصال بـ API الأرشفة
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: ['https://googleapis.com'],
});

/**
 * دالة لإرسال الرابط تلقائياً لغوغل لطلب أرشفته فوراً
 * @param url الرابط الكامل المراد أرشفته
 */
export async function requestInstantIndexing(url: string) {
  try {
    const authClient = await auth.getClient();
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient as any,
    });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    console.log(`✅ [Google Indexing] تم إرسال الرابط بنجاح: ${url}`);
    return response.data;
  } catch (error) {
    console.error(`❌ [Google Indexing] فشل إرسال الرابط: ${url}`, error);
    throw error;
  }
}
