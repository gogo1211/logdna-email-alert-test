import { sleep } from '../../../utils/sleep';

/**
 * Endpoint for save alert
 * @param {object} req.body { alertMessage: string, frequency: 'hourly' | 'daily', recipients: Array<{ email: string }> }
 */
export default async function handler(req, res) {
  const data = req.body;

  // Log alert detail & recipient
  console.log('[Email Alert]: save', data);
  await sleep(3000);
  res.status(200).json({ result: 'success' });
}
