import { GoogleSpreadsheet } from 'google-spreadsheet';

const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

export default async function handler(req, res) {
  try {
    const doc = new GoogleSpreadsheet('1XgUuKrf_hI_WHY5CReKAafoW7aby1lEWV2wAxnlesQI');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // mostra os primeiros 3 IDs que encontrou
    const ids = rows.slice(0,3).map(r => r.id);

    res.status(200).json({ message: 'Sheet lido com sucesso!', ids });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}