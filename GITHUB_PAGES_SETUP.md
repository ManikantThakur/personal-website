# GitHub Pages Setup for Calendar Booking System

This guide will help you set up the calendar booking system to work with GitHub Pages using Formspree for email notifications.

## Step 1: Set up Formspree

1. Go to [Formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL (it looks like `https://formspree.io/f/xxxxxxxxxx`)

## Step 2: Update the Formspree Endpoint

1. Open `js/main.js`
2. Find the line: `const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT', {`
3. Replace `YOUR_FORMSPREE_ENDPOINT` with your actual Formspree endpoint

## Step 3: Configure Formspree Settings

In your Formspree dashboard:

1. **Email Notifications**: Enable email notifications to your email address
2. **Auto-Responder**: Enable auto-responder to send confirmation emails to clients
3. **Customize Email Template**: 
   - Go to Settings → Notifications
   - Customize the email template to include booking details
   - Use this template:

```html
<h2>New Booking Request</h2>
<p><strong>Client:</strong> {{name}} ({{email}})</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Booking ID:</strong> {{booking_id}}</p>
<p><strong>Date:</strong> {{booking_date}}</p>
<p><strong>Time:</strong> {{booking_time}}</p>
<p><strong>Session Type:</strong> {{session_type}}</p>
<p><strong>Duration:</strong> {{session_duration}}</p>
<p><strong>Meeting Type:</strong> {{meeting_type}}</p>
<p><strong>Project Description:</strong> {{project_description}}</p>
<p><strong>Additional Notes:</strong> {{additional_notes}}</p>
```

## Step 4: Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Scroll down to "Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your website will be available at: `https://yourusername.github.io/repository-name`

## Step 5: Test the Booking System

1. Visit your GitHub Pages URL
2. Navigate to the "Book Session" section
3. Try booking a session
4. Check your email for the notification
5. Check Formspree dashboard for form submissions

## Alternative: Netlify Forms (If you prefer)

If you want to use Netlify instead of Formspree:

1. Deploy to Netlify (drag and drop your folder)
2. Add `netlify` attribute to your form
3. Update the form action in the HTML

## Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify Formspree endpoint is correct
- Check Formspree dashboard for submission logs

### Emails not received
- Check spam folder
- Verify email settings in Formspree
- Test with a different email address

### Calendar not working
- Check browser console for JavaScript errors
- Ensure all files are properly uploaded to GitHub

## Features That Work on GitHub Pages

✅ Calendar interface
✅ Date/time selection
✅ Form validation
✅ Email notifications (via Formspree)
✅ Responsive design
✅ All frontend functionality

## Limitations on GitHub Pages

❌ Server-side processing
❌ Database storage (bookings stored in Formspree)
❌ Real-time calendar integration
❌ Custom email templates (limited by Formspree)

## Upgrading to Full Backend (Optional)

If you want the full backend functionality:

1. Deploy the Node.js server to Heroku, Vercel, or DigitalOcean
2. Update the fetch URL in `js/main.js` to point to your server
3. Set up environment variables for email configuration

## Support

For issues:
1. Check Formspree documentation
2. Check browser console for errors
3. Verify all files are properly uploaded to GitHub