import {join} from 'path';
import {writeFileSync} from 'fs';

export async function saveThumbnail(base64Image: string): Promise<string> {
  const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches) {
    throw new Error('Неверный формат Base64');
  }

  const type = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');

  const fileName = `${Date.now()}.${type.split('/')[1]}`; // Уникальное имя файла
  const filePath = join(__dirname, 'uploads', fileName); // Путь к файлу (папка 'uploads' должна существовать)

// Запись файла на диск
  writeFileSync(filePath, buffer);

// Возврат URL для доступа к изображению
  return `/uploads/${fileName}`; // Предполагается, что сервер настроен для обслуживания статических файлов из папки 'uploads'
}
