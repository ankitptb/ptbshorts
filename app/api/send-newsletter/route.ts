import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Fetch news from Airtable (reusing logic from /api/news for consistency)
        // In a real app, this logic should be shared in a lib function.
        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

        let newsItems = [];

        if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_TABLE_NAME) {
            const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=5&sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=desc`;

            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    },
                    next: { revalidate: 0 }, // No cache for newsletter to get latest
                });

                if (response.ok) {
                    const data = await response.json();
                    newsItems = data.records.map((record: any) => ({
                        title: record.fields.title || 'Untitled',
                        description: record.fields.description || '',
                        imageUrl: record.fields.imageUrl || 'https://via.placeholder.com/150',
                        articleUrl: record.fields.articleUrl || '#',
                        date: record.fields.date || new Date().toISOString().split('T')[0],
                    }));
                }
            } catch (e) {
                console.error("Failed to fetch news for newsletter", e);
            }
        }

        // Fallback or just ensure we have data
        if (newsItems.length === 0) {
            // Use some dummy data if fetch fails, or handle error. 
            // Ideally we shouldn't send empty email, but for demo we will proceed or fail.
            // Let's assume fetch works or we return error.
            // Actually, the prompt says "fetched form out api". If it fails, we should probably not send.
            // But to be robust for the user, I'll log and continue if I can, or error.
            // I'll return error if no news.
            return NextResponse.json({ error: 'Failed to fetch news for newsletter' }, { status: 500 });
        }

        // Format Date: 06 Feb 2025
        const today = new Date();
        const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-GB', dateOptions);

        // Construct HTML
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: sans-serif; background-color: #f7fafc; padding: 20px; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .header h1 { color: #2563eb; margin: 0; }
                    .header p { color: #6b7280; font-size: 14px; margin-top: 5px; }
                    .news-item { display: flex; margin-bottom: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 24px; }
                    .news-item:last-child { border-bottom: none; }
                    .news-image { width: 120px; height: 120px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
                    .news-content { margin-left: 20px; flex: 1; }
                    .news-title { font-size: 18px; font-weight: bold; color: #111827; margin: 0 0 4px 0; }
                    .news-date { font-size: 12px; color: #9ca3af; margin: 0 0 4px 0; display: block; font-weight: 500; }
                    .news-desc { color: #4b5563; font-size: 14px; line-height: 1.5; margin: 0; }
                    .read-more { color: #2563eb; text-decoration: none; font-weight: bold; margin-left: 5px; cursor: pointer; }
                    .footer { text-align: center; font-size: 12px; color: #9ca3af; margin-top: 30px; }
                    
                    /* Mobile Styles */
                    @media only screen and (max-width: 600px) {
                        .container { padding: 15px !important; width: 100% !important; }
                        /* Increased gap and visible divider */
                        .news-item { display: block !important; border-bottom: 2px solid #e5e7eb !important; padding-bottom: 30px !important; margin-bottom: 30px !important; }
                        .news-image { 
                            width: 100% !important; 
                            height: auto !important; 
                            aspect-ratio: 16/9 !important; 
                            object-fit: cover !important; 
                            margin-bottom: 15px !important; 
                            border-radius: 8px !important;
                        }
                        .news-content { margin-left: 0 !important; width: 100% !important; }
                        .news-title { font-size: 18px !important; margin-bottom: 4px !important; }
                        .news-desc { font-size: 14px !important; line-height: 1.5 !important; }
                        .read-more { display: inline-block !important; padding: 5px 0 !important; }
                        .footer { text-align: center !important; width: 100% !important; }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>PTB Shorts Newsletter</h1>
                        <p>Latest updates from PropTechBuzz</p>
                    </div>
                    
                    ${newsItems.map((item: any) => `
                        <div class="news-item">
                            <!-- Link wrapping image for better UX -->
                            <a href="${item.articleUrl || '#'}" style="text-decoration: none; display: block;" target="_blank">
                                <img src="${item.imageUrl}" alt="${item.title}" class="news-image" />
                            </a>
                            <div class="news-content">
                                <span class="news-date">${item.date}</span>
                                <h2 class="news-title">
                                    <a href="${item.articleUrl || '#'}" style="text-decoration: none; color: #111827;" target="_blank">
                                        ${item.title}
                                    </a>
                                </h2>
                                <p class="news-desc">
                                    ${item.description.replace(/\*/g, '').substring(0, 100)}${item.description.length > 100 ? '...' : ''}
                                    <a href="${item.articleUrl || '#'}" class="read-more" target="_blank">Read More</a>
                                </p>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} PropTechBuzz. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: [email],
            subject: `Your PTB Shorts Daily Update For ${formattedDate}`,
            html: emailHtml,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Newsletter sent successfully' });
    } catch (error) {
        console.error('Newsletter Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
