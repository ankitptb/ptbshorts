import { NextResponse } from 'next/server';
import { NewsItem } from '@/lib/data';

export async function GET() {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
        return NextResponse.json({ error: 'Missing Airtable configuration' }, { status: 500 });
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json({ error: 'Failed to fetch from Airtable', details: errorData }, { status: response.status });
        }

        const data = await response.json();

        // Transform Airtable records to NewsItem format
        const news: NewsItem[] = data.records.map((record: any) => ({
            id: record.id, // Use Airtable record ID
            // Map fields, handling potential missing values safely
            title: record.fields.title || 'Untitled',
            description: record.fields.description || '',
            imageUrl: record.fields.imageUrl || '',
            date: record.fields.date || new Date().toISOString(),
            source: record.fields.source || 'PropTechBuzz',
            category: record.fields.category || 'All',
            hashtags: record.fields.hashtags ? record.fields.hashtags.split(' ') : [], // Assuming space-separated or single string
            articleUrl: record.fields.articleUrl || '',
        }));

        return NextResponse.json({ news });
    } catch (error) {
        console.error('Error fetching from Airtable:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
