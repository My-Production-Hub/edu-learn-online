'use strict';

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

function getSampleBlogs(now, d2, d4) {
  return [
    {
      id: 'blog-1',
      title: 'Hanh trang can chuan bi truoc khi nhay nganh',
      excerpt: 'Chuyen nganh sang linh vuc cong nghe khong bao gio la muon neu ban co su chuan bi ky cang.',
      content: '<h2>1. Xac dinh muc tieu ro rang</h2><p>Truoc khi nhay nganh, ban can biet ro minh muon den dau.</p>',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      created_at: now
    },
    {
      id: 'blog-2',
      title: 'Ban da biet cach chay quang cao Facebook Ads chua?',
      excerpt: 'Facebook Ads la cong cu marketing manh me giup tiep can hang trieu khach hang.',
      content: '<h2>1. Hieu ro Facebook Ads</h2><p>Facebook Ads la nen tang quang cao tra phi cua Meta.</p>',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
      created_at: d2
    },
    {
      id: 'blog-3',
      title: 'Co nen dau tu vao tien ao khong? Nhung kenh dau tu hap dan nam 2025',
      excerpt: 'Thi truong tien dien tu ngay cang thu hut nhieu nha dau tu.',
      content: '<h2>1. Tien ao la gi?</h2><p>Tien dien tu la loai tien te ky thuat so su dung mat ma hoc.</p>',
      image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80',
      created_at: d4
    }
  ];
}

async function upsertBlog(db, blog) {
  const exists = await db.get('SELECT id FROM blogs WHERE id = ?', [blog.id]);
  if (!exists) {
    await db.run(
      'INSERT INTO blogs (id, title, excerpt, content, image, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [blog.id, blog.title, blog.excerpt, blog.content, blog.image, blog.created_at]
    );
  } else {
    await db.run(
      'UPDATE blogs SET title=?, excerpt=?, content=?, image=?, created_at=? WHERE id=?',
      [blog.title, blog.excerpt, blog.content, blog.image, blog.created_at, blog.id]
    );
  }
}

async function seed() {
  const db = await open({ filename: path.join(__dirname, 'database.sqlite'), driver: sqlite3.Database });
  const now = new Date().toISOString();
  const d2 = new Date(Date.now() - 86400000 * 2).toISOString();
  const d4 = new Date(Date.now() - 86400000 * 4).toISOString();
  const blogs = getSampleBlogs(now, d2, d4);

  for (const blog of blogs) {
    await upsertBlog(db, blog);
  }

  const all = await db.all('SELECT id, title FROM blogs');
  console.log('All blogs now count:', all.length);
  await db.close();
}

seed().catch(console.error);
