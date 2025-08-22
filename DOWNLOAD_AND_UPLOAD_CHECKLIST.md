# 🚨 URGENT: Download & Upload Files to Fix Vercel 404 Error

## Issue: API routes returning 404 on Vercel
**Root Cause**: Your GitHub repository is missing the API files, so Vercel can't deploy them.

## 📥 FILES TO DOWNLOAD FROM REPLIT:

### ✅ Essential API Files (MUST UPLOAD):
```
api/
├── auth/
│   ├── signup.ts ⭐ CRITICAL
│   ├── signin.ts ⭐ CRITICAL  
│   ├── signout.ts ⭐ CRITICAL
│   └── me.ts ⭐ CRITICAL
├── packages/
│   └── index.ts
├── index.ts
└── import-courses.ts
```

### ✅ Updated Client Files (Authentication Fixes):
```
client/src/lib/
├── auth.ts ⭐ UPDATED (body consumption fix)
└── queryClient.ts ⭐ UPDATED (body consumption fix)
```

### ✅ Configuration Files:
```
vercel.json ⭐ CRITICAL
package.json
tsconfig.json
```

## 🎯 STEP-BY-STEP UPLOAD PROCESS:

### Step 1: Download Files from Replit
1. Click on each file listed above
2. Copy the content 
3. Save to your local computer

### Step 2: Upload to GitHub Repository
1. Go to your GitHub repository
2. Navigate to the correct folder structure:
   - Create `api/auth/` folder if it doesn't exist
   - Upload all API files maintaining the folder structure
3. Replace existing files with updated versions

### Step 3: Verify Structure
Your GitHub repo should have this structure:
```
your-repo/
├── api/
│   ├── auth/
│   │   ├── signup.ts
│   │   ├── signin.ts
│   │   ├── signout.ts
│   │   └── me.ts
│   └── packages/
│       └── index.ts
├── client/
│   └── src/
│       └── lib/
│           ├── auth.ts
│           └── queryClient.ts
├── vercel.json
└── package.json
```

## ⚡ After Upload:

1. **Vercel will auto-redeploy** (usually takes 2-3 minutes)
2. **Test the API directly**: Visit `https://codewise-zeta.vercel.app/api/auth/signup`
   - Should show "Method not allowed" (405) instead of 404
   - This confirms the API route exists
3. **Test signup/signin**: Should work perfectly now

## 🔍 Quick Test URLs (After Upload):
- `https://codewise-zeta.vercel.app/api/auth/signup` (should NOT be 404)
- `https://codewise-zeta.vercel.app/api/packages` (should return package data)

## 💡 Why This Fixes the Issue:
- ✅ Your API code is correct (works locally)
- ✅ Your database is working (6 users created)  
- ✅ Your Vercel config is correct
- ❌ **Missing**: API files in GitHub → Vercel can't deploy them

The 404 error will disappear immediately after you upload the API files to GitHub!

## 🚨 PRIORITY UPLOAD ORDER:
1. **api/auth/signup.ts** (Most critical - fixes signup)
2. **api/auth/signin.ts** (Fixes login) 
3. **api/auth/me.ts** (Fixes session checking)
4. **api/auth/signout.ts** (Fixes logout)
5. **client/src/lib/auth.ts** (Fixes body consumption error)