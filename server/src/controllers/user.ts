import { Request, Response } from 'express';
import axios from 'axios';
import {
  AUTH0_MGMT_CLIENT_ID, AUTH0_MGMT_CLIENT_SECRET, AUTH0_DOMAIN, AUTH0_USER_ROLE,
} from '../config/secrets';

export default async (req: Request, res: Response): Promise<Response> => {
  const { url } = req.body;

  const response = await axios.post(
    `https://${AUTH0_DOMAIN}/oauth/token`,
    {
      client_id: AUTH0_MGMT_CLIENT_ID,
      client_secret: AUTH0_MGMT_CLIENT_SECRET,
      audience: `https://${AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  const data = {
    roles: [AUTH0_USER_ROLE],
  };

  const config = {
    headers: {
      authorization: `Bearer ${response.data.access_token}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
  };

  await axios.post(url, data, config);

  return res.status(200).json({ message: [{ msg: 'User role assigned.', param: 'success' }] });
};
