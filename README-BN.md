# Netlify Device Info Share

এটি একটি consent-based device info sharing demo।

## কীভাবে কাজ করে
- Visitor পেজে ঐচ্ছিক IMEI field আছে; এটি শুধু browser-এ format check করে।
- IMEI কখনো server-এ পাঠানো বা save করা হয় না।
- Visitor স্পষ্টভাবে checkbox tick করে Submit চাপলে browser থেকে পাওয়া সীমিত তথ্য পাঠানো হয়।
- Device model সব browser-এ পাওয়া যায় না; না পাওয়া গেলে "Unavailable" দেখাবে।
- Admin data Netlify Blobs-এ থাকবে।

## Netlify-তে সেটআপ (মোবাইল দিয়েও করা যায়)
1. ZIP extract করে GitHub repository-তে সব ফাইল upload করুন।
2. Netlify Dashboard → Add new site → Import an existing project → GitHub repository নির্বাচন করুন।
3. Build settings: Publish directory `public`; build command ফাঁকা রাখুন।
4. Site configuration → Environment variables-এ এই দুটি variable যোগ করুন:
   - `ADMIN_USER` = `tajim09889`
   - `ADMIN_PASS` = `09889`
5. Deploy করুন। Environment variable যোগ/বদলালে আবার deploy করতে হবে।

## Admin
Deploy শেষে `https://আপনার-site.netlify.app/admin.html` খুলুন এবং username/password দিন।

**নিরাপত্তা:** `09889` খুব সহজ password। Public site-এর জন্য deploy করার আগে Netlify Environment Variables-এ আরও শক্তিশালী password দিন। এই password কখনো HTML/JS ফাইলে রাখা হয়নি।

## সীমাবদ্ধতা
সাধারণ website browser থেকে Android IMEI পড়তে পারে না, এবং IMEI দিয়ে live location track করতে পারে না। Device model-ও browser অনুযায়ী অনুপলব্ধ হতে পারে। শুধু visitor নিজে সম্মতি দিয়ে পাঠানো তথ্যই Admin-এ দেখা যাবে।
