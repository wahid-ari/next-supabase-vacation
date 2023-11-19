import { NextApiRequest, NextApiResponse } from 'next';
import { compare, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { supabase } from '@/libs/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  // async function pass() {
  //   let hashed = await hash('password', 8);
  //   // save hashed to db
  //   console.log(hashed)
  //   // compare hashed from db and password from a form that submitted
  //   let isMatch = await compare(form.password, hashed);
  //   console.log(isMatch)
  // }
  // pass()

  // const token = jwt.sign(
  //   {
  //     username: data.username,
  //     password: data.name,
  //   },
  //   process.env.NEXTAUTH_SECRET
  // );
  // const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);

  switch (method) {
    case 'POST':
      if (!body.name) {
        res.status(422).json({ error: 'Name required' });
        return;
      } else if (!body.username) {
        res.status(422).json({ error: 'Username required' });
        return;
      } else if (!body.password) {
        res.status(422).json({ error: 'Password required' });
        return;
      } else {
        const { data: userNameExist } = await supabase
          .from('vacation_user')
          .select(`*`)
          .eq('username', body.username.toLowerCase())
          .limit(1)
          .single();
        if (userNameExist === null) {
          // FIX this register logic
          // if username not exist, hash password and inset to db
          // const passwordHashed = await hash(body.password, 8);
          // const { data: insertUser } = await supabase.from('vacation_user').insert([
          //   {
          //     username: body.username.toLowerCase(),
          //     name: body.name,
          //     type: 'user',
          //     password: passwordHashed,
          //   },
          // ]);
          // if no error after inserting user
          // if (insertUser == null) {
          res.status(200).json({ message: 'Success register' });
          return;
          // }
        } else {
          res.status(422).json({ error: 'Username already exist' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// switch (method) {
//   case "GET":
//     try {
//       if (!req.headers.authorization) {
//         return res.json({ error: "Please provide headers" });
//       }
//       const token = req.headers.authorization.split("Bearer ")[1];
//       if (!token) {
//         return res.json({ error: "Token not found" });
//       }
//       const user = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//       if (!user) {
//         return res.json({ error: "Token not valid" });
//       }
//       const user_data = await User.aggregate([
//         {
//           $match: {
//             username: user.username,
//           },
//         },
//       ]);
//       if (!user_data[0]) {
//         return res.json({ error: "User not found" });
//       }
//       const isMatch = await compare(user.password, user_data[0].password);
//       if (!isMatch) {
//         return res.json({ error: "Token not valid" });
//       }
//       delete user_data[0].password;
//       return res.json(user_data[0]);
//     } catch (err) {
//       return res.json({ error: "Error on calling API" });
//     }
//   default:
//     return res.json({ error: "Only accepting GET method" });
// }
