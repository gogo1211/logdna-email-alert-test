import { sleep } from '../../../utils/sleep';

/**
 * Endpoint for testing alert
 * @param {object} req.body { alertMessage: string, frequency: 'hourly' | 'daily', recipients: Array<{ email: string }> }
 */
export default async function handler(req, res) {
  const data = req.body;

  // Log alert detail & recipient
  console.log('[Email Alert]: test', data);
  await sleep(3000);
  res.status(200).json({ result: 'success' });
}
