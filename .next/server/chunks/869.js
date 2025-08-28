"use strict";exports.id=869,exports.ids=[869],exports.modules={26150:(a,b,c)=>{c.d(b,{ht:()=>i,kg:()=>h});var d=c(61483),e=c(70415),f=c(76344),g=c(18839);async function h({email:a,password:b,name:c}){let g=await (0,d.Er)(b);return(await e.db.insert(f.users).values({email:a,password:g,name:c}).returning())[0]}let i=async a=>await e.db.query.users.findFirst({where:(0,g.eq)(f.users.email,a)})},34254:(a,b,c)=>{c.d(b,{Fl:()=>i,fP:()=>h,u8:()=>g});var d=c(70415),e=c(76344),f=c(18839);async function g(a){try{let b=Math.floor(1e5+9e5*Math.random()).toString(),c=new Date(Date.now()+9e5),g=await d.db.update(e.users).set({verificationCode:b,verificationCodeExpires:c,updatedAt:new Date}).where((0,f.eq)(e.users.email,a)).returning();return{success:!0,verificationCode:b,user:g[0]}}catch(a){return console.error("Generate verification code error:",a),{error:"Failed to generate verification code"}}}async function h(a,b){try{let c=await d.db.query.users.findFirst({where:(0,f.eq)(e.users.email,a)});if(!c)return{success:!1,error:"User not found"};if(!c.verificationCode||!c.verificationCodeExpires)return{success:!1,error:"No verification code found"};if(new Date>c.verificationCodeExpires)return{success:!1,error:"Verification code has expired"};if(c.verificationCode!==b)return{success:!1,error:"Invalid verification code"};let g=await d.db.update(e.users).set({emailVerified:"true",verificationCode:null,verificationCodeExpires:null,updatedAt:new Date}).where((0,f.eq)(e.users.email,a)).returning();return{success:!0,user:g[0],error:null}}catch(a){return console.error("Verify email code error:",a),{success:!1,error:"Failed to verify email code"}}}async function i(a){try{let b=await d.db.query.users.findFirst({where:(0,f.eq)(e.users.email,a)});return b?.emailVerified==="true"}catch(a){return console.error("Check email verification error:",a),!1}}},61483:(a,b,c)=>{c.d(b,{BE:()=>f,Er:()=>e});var d=c(34872);async function e(a){return await d.Ay.hash(a,12)}async function f(a,b){return await d.Ay.compare(a,b)}},70415:(a,b,c)=>{c.d(b,{db:()=>h});var d=c(71058),e=c(92495),f=c(76344);let g=(0,d.lw)(process.env.DATABASE_URL),h=(0,e.fd)({client:g,schema:f})},76344:(a,b,c)=>{c.r(b),c.d(b,{comments:()=>n,commentsRelations:()=>t,likes:()=>o,likesRelations:()=>u,userSessions:()=>q,userSessionsRelations:()=>w,users:()=>l,usersRelations:()=>r,videoViews:()=>p,videoViewsRelations:()=>v,videos:()=>m,videosRelations:()=>s});var d=c(15905),e=c(71911),f=c(60579),g=c(91850),h=c(57318),i=c(75680),j=c(1517),k=c(4234);let l=(0,d.cJ)("users",{id:(0,e.uR)("id").primaryKey().defaultRandom(),email:(0,f.Qq)("email").notNull().unique(),password:(0,f.Qq)("password").notNull(),name:(0,f.Qq)("name").notNull(),image:(0,f.Qq)("image"),emailVerified:(0,f.Qq)("email_verified").default("false"),verificationCode:(0,f.Qq)("verification_code"),verificationCodeExpires:(0,g.vE)("verification_code_expires"),createdAt:(0,g.vE)("created_at").defaultNow().notNull(),updatedAt:(0,g.vE)("updated_at").defaultNow().notNull()},a=>[(0,h.Pe)("email_idx").on(a.email)]),m=(0,d.cJ)("videos",{id:(0,e.uR)("id").primaryKey().defaultRandom(),title:(0,f.Qq)("title").notNull(),description:(0,f.Qq)("description"),url:(0,f.Qq)("url").notNull(),thumbnail:(0,f.Qq)("thumbnail"),duration:(0,i.nd)("duration"),userId:(0,e.uR)("user_id").notNull().references(()=>l.id,{onDelete:"cascade"}),createdAt:(0,g.vE)("created_at").defaultNow().notNull(),updatedAt:(0,g.vE)("updated_at").defaultNow().notNull()},a=>[(0,h.Pe)("videos_user_id_idx").on(a.userId),(0,h.Pe)("videos_created_at_idx").on(a.createdAt)]),n=(0,d.cJ)("comments",{id:(0,e.uR)("id").primaryKey().defaultRandom(),content:(0,f.Qq)("content").notNull(),videoId:(0,e.uR)("video_id").notNull().references(()=>m.id,{onDelete:"cascade"}),userId:(0,e.uR)("user_id").notNull().references(()=>l.id,{onDelete:"cascade"}),createdAt:(0,g.vE)("created_at").defaultNow().notNull(),updatedAt:(0,g.vE)("updated_at").defaultNow().notNull()},a=>[(0,h.Pe)("comments_video_id_idx").on(a.videoId),(0,h.Pe)("comments_user_id_idx").on(a.userId),(0,h.Pe)("comments_created_at_idx").on(a.createdAt)]),o=(0,d.cJ)("likes",{id:(0,e.uR)("id").primaryKey().defaultRandom(),videoId:(0,e.uR)("video_id").notNull().references(()=>m.id,{onDelete:"cascade"}),userId:(0,e.uR)("user_id").notNull().references(()=>l.id,{onDelete:"cascade"}),type:(0,f.Qq)("type").notNull().$type(),createdAt:(0,g.vE)("created_at").defaultNow().notNull()},a=>[(0,h.Pe)("likes_video_id_idx").on(a.videoId),(0,h.Pe)("likes_user_id_idx").on(a.userId),(0,j.Am)("unique_user_video_idx").on(a.userId,a.videoId)]),p=(0,d.cJ)("video_views",{id:(0,e.uR)("id").primaryKey().defaultRandom(),videoId:(0,e.uR)("video_id").notNull().references(()=>m.id,{onDelete:"cascade"}),userId:(0,e.uR)("user_id").references(()=>l.id,{onDelete:"cascade"}),ipAddress:(0,f.Qq)("ip_address"),userAgent:(0,f.Qq)("user_agent"),viewedAt:(0,g.vE)("viewed_at").defaultNow().notNull()},a=>[(0,h.Pe)("video_views_video_id_idx").on(a.videoId),(0,h.Pe)("video_views_user_id_idx").on(a.userId),(0,h.Pe)("video_views_viewed_at_idx").on(a.viewedAt)]),q=(0,d.cJ)("user_sessions",{id:(0,e.uR)("id").primaryKey().defaultRandom(),userId:(0,e.uR)("user_id").notNull().references(()=>l.id,{onDelete:"cascade"}),sessionToken:(0,f.Qq)("session_token").notNull().unique(),expires:(0,g.vE)("expires").notNull(),createdAt:(0,g.vE)("created_at").defaultNow().notNull()},a=>[(0,h.Pe)("user_sessions_user_id_idx").on(a.userId),(0,h.Pe)("user_sessions_token_idx").on(a.sessionToken)]),r=(0,k.K1)(l,({many:a})=>({videos:a(m),comments:a(n),likes:a(o),sessions:a(q)})),s=(0,k.K1)(m,({one:a,many:b})=>({user:a(l,{fields:[m.userId],references:[l.id]}),comments:b(n),likes:b(o),views:b(p)})),t=(0,k.K1)(n,({one:a,many:b})=>({video:a(m,{fields:[n.videoId],references:[m.id]}),user:a(l,{fields:[n.userId],references:[l.id]}),replies:b(n)})),u=(0,k.K1)(o,({one:a})=>({video:a(m,{fields:[o.videoId],references:[m.id]}),user:a(l,{fields:[o.userId],references:[l.id]})})),v=(0,k.K1)(p,({one:a})=>({video:a(m,{fields:[p.videoId],references:[m.id]}),user:a(l,{fields:[p.userId],references:[l.id]})})),w=(0,k.K1)(q,({one:a})=>({user:a(l,{fields:[q.userId],references:[l.id]})}))},99153:(a,b,c)=>{c.d(b,{k:()=>g,v:()=>h});var d=c(41635);let e=()=>{let a={host:process.env.SMTP_HOST||"smtp.gmail.com",port:parseInt(process.env.SMTP_PORT||"587"),secure:!1,auth:{user:process.env.SMTP_USER||"",pass:process.env.SMTP_PASS||""}};if(!a.auth.user||!a.auth.pass)throw Error("SMTP_USER and SMTP_PASS environment variables are required");return d.createTransport(a)},f=()=>{let a=process.env.SMTP_USER;if(!a)throw Error("SMTP_USER environment variable is required");return`"VideoPlatform" <${a}>`},g=async(a,b,c)=>{try{let d=e(),g={from:f(),to:a,subject:"Verify Your Email Address - VideoPlatform",html:`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #2d3748;
          margin-bottom: 20px;
        }
        .description {
          color: #4a5568;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        .verification-code {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          margin: 30px 0;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 6px;
          color: #2d3748;
          font-family: 'Courier New', monospace;
        }
        .expiry-notice {
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          color: #c53030;
          font-size: 14px;
        }
        .footer {
          background: #f7fafc;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          margin: 5px 0;
          font-size: 12px;
          color: #718096;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎬 TikTok Clone</div>
          <h1>Email Verification</h1>
        </div>
        
        <div class="content">
          <div class="greeting">
            <strong>Hello ${c}!</strong>
          </div>
          
          <div class="description">
            Thank you for signing up for TikTok Clone! To complete your registration and start sharing amazing videos, please verify your email address by entering the verification code below.
          </div>
          
          <div class="verification-code">
            ${b}
          </div>
          
          <div class="expiry-notice">
            ⏰ This verification code will expire in 15 minutes for security reasons.
          </div>
          
          <div class="description">
            If you didn't create an account with us, you can safely ignore this email. Your account won't be activated without verification.
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>&copy; 2024 TikTok Clone. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `},h=await d.sendMail(g);return console.log("Verification email sent: %s",h.messageId),{success:!0,messageId:h.messageId}}catch(a){return console.error("Error sending verification email:",a),{success:!1,error:"Failed to send verification email"}}},h=async(a,b)=>{try{let c=e(),d={from:f(),to:a,subject:"Welcome to VideoPlatform! \uD83C\uDF89",html:`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to TikTok Clone!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 20px;
          color: #2d3748;
          margin-bottom: 20px;
        }
        .description {
          color: #4a5568;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        .success-icon {
          text-align: center;
          font-size: 48px;
          margin: 20px 0;
        }
        .features {
          background: #f7fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .features h3 {
          color: #2d3748;
          margin-top: 0;
        }
        .features ul {
          color: #4a5568;
          padding-left: 20px;
        }
        .features li {
          margin-bottom: 8px;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
        }
        .footer {
          background: #f7fafc;
          padding: 20px 30px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          margin: 5px 0;
          font-size: 12px;
          color: #718096;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎬 TikTok Clone</div>
          <h1>Welcome!</h1>
        </div>
        
        <div class="content">
          <div class="success-icon">✅</div>
          
          <div class="greeting">
            <strong>Hello ${b}!</strong>
          </div>
          
          <div class="description">
            Congratulations! Your email has been successfully verified. You're now a member of our vibrant community and can start sharing your amazing videos with the world!
          </div>
          
          <div class="features">
            <h3>🎉 What you can do now:</h3>
            <ul>
              <li>📹 Upload and share your videos</li>
              <li>💬 Comment on videos and engage with the community</li>
              <li>❤️ Like and interact with content you love</li>
              <li>👥 Connect with other creators</li>
              <li>📊 Track your video performance</li>
            </ul>
          </div>
          
          <div class="cta">
            <a href="${process.env.NEXTAUTH_URL||"http://localhost:3000"}" class="cta-button">
              Start Creating Now! 🚀
            </a>
          </div>
          
          <div class="description">
            Thank you for joining our community! We're excited to see what amazing content you'll create.
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>&copy; 2024 TikTok Clone. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `},g=await c.sendMail(d);return console.log("Welcome email sent: %s",g.messageId),{success:!0,messageId:g.messageId}}catch(a){return console.error("Error sending welcome email:",a),{success:!1,error:"Failed to send welcome email"}}}}};