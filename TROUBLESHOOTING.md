# Troubleshooting GitHub Pages Booking System

## Common Issues and Solutions

### 1. Booking Form Not Working on GitHub Pages

**Symptoms:**
- Form works locally but not on GitHub Pages
- No error messages shown to user
- Form submission appears to hang

**Solutions:**

#### A. Check Browser Console
1. Open your live website
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try booking a session
5. Look for error messages

**Common Console Errors:**
- `CORS error`: Formspree CORS issue
- `Mixed content`: HTTP/HTTPS issue
- `Network error`: Connectivity issue

#### B. Verify Formspree Configuration
1. Go to [Formspree Dashboard](https://formspree.io)
2. Check if your form is active
3. Verify the endpoint URL: `https://formspree.io/f/mgvndopo`
4. Check if you have any submissions in the dashboard

#### C. Test Formspree Directly
Visit this URL to test if Formspree is working:
```
https://formspree.io/f/mgvndopo
```

### 2. CORS Issues

**Solution:** The code now includes a fallback method using hidden form submission that bypasses CORS.

### 3. Mixed Content Issues

**Symptoms:**
- Website loads but forms don't work
- Console shows "Mixed content" errors

**Solution:** Ensure your GitHub Pages site uses HTTPS (it should by default).

### 4. Formspree Not Receiving Submissions

**Check:**
1. Formspree dashboard for submissions
2. Email notifications settings
3. Spam folder for emails

### 5. Debug Steps

#### Step 1: Check Console
```javascript
// Open browser console and look for these messages:
"Website loaded successfully"
"Running on GitHub Pages" (or "Running locally")
"Formspree connectivity test: 200" (should be 200)
```

#### Step 2: Test Form Submission
```javascript
// In console, try this:
fetch('https://formspree.io/f/mgvndopo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: 'data' })
}).then(r => console.log('Test result:', r.status));
```

#### Step 3: Check Network Tab
1. Open Developer Tools
2. Go to Network tab
3. Try submitting a booking
4. Look for requests to `formspree.io`
5. Check the status code and response

### 6. Alternative Solutions

#### Option A: Use Netlify Forms (Alternative to Formspree)
1. Deploy to Netlify instead of GitHub Pages
2. Add `netlify` attribute to form
3. No external service needed

#### Option B: Use EmailJS (Client-side email service)
1. Sign up at [EmailJS](https://www.emailjs.com)
2. Configure email service
3. Update JavaScript to use EmailJS

#### Option C: Use a Different Form Service
- Typeform
- Google Forms
- JotForm

### 7. Quick Fixes

#### Fix 1: Clear Cache
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try incognito/private mode

#### Fix 2: Check Formspree Status
- Visit [Formspree Status Page](https://status.formspree.io)
- Check if there are any service issues

#### Fix 3: Verify Formspree Settings
1. Go to Formspree dashboard
2. Check form settings
3. Ensure form is not disabled
4. Check email configuration

### 8. Testing Checklist

- [ ] Website loads on GitHub Pages
- [ ] Console shows no errors
- [ ] Formspree connectivity test passes
- [ ] Booking form opens correctly
- [ ] Date/time selection works
- [ ] Form submission completes
- [ ] Email notification received
- [ ] Formspree dashboard shows submission

### 9. Contact Information

If issues persist:
1. Check Formspree documentation
2. Contact Formspree support
3. Check GitHub Pages status
4. Review browser console errors

### 10. Emergency Fallback

If nothing works, you can temporarily:
1. Add a contact form that just collects email
2. Use a simple mailto link
3. Display your email address prominently