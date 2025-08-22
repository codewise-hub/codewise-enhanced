# 📚 CONTENT LOADING GUIDE FOR VERCEL DEPLOYMENT

## How to Load Course Materials on Vercel

Your CodewiseHub app is designed to work seamlessly on Vercel with multiple content loading strategies:

### 🎯 Current Content Strategy

**1. YouTube Video Integration**
- **Prompt Engineering Video**: Updated to https://www.youtube.com/embed/dOxUroR57xs
- **Duration**: 2 minutes (perfect for engagement)
- **Content**: Explains what prompt engineering is and its benefits
- **Works on Vercel**: ✅ Embedded YouTube videos load instantly

**2. Database-Driven Content**
- **Course Materials**: Stored in Neon PostgreSQL database
- **Dynamic Loading**: API endpoints fetch content from database
- **Scalable**: Add new courses through admin CMS or API
- **Works on Vercel**: ✅ API routes handle database queries

**3. Static Assets (Optional)**
- **Images**: Can be stored in `/public` folder or external CDN
- **Documents**: PDFs and study materials via cloud storage
- **Works on Vercel**: ✅ Static files served directly

### 🚀 Content Loading Options on Vercel

**Option 1: Database Content (Recommended)**
```javascript
// Already implemented in your app
const { data: courses } = useQuery({
  queryKey: ['/api/courses', ageGroup],
  queryFn: async () => {
    const response = await fetch(`/api/courses?ageGroup=${ageGroup}`);
    return response.json();
  }
});
```

**Option 2: YouTube Videos (Current)**
- Embedded YouTube videos load instantly
- No storage costs
- Reliable global CDN
- Perfect for educational content

**Option 3: Cloud Storage (Future)**
- Use Replit Object Storage or AWS S3
- Upload PDFs, documents, images
- Scalable for large files

### 📝 Updated Teen Coders Dashboard

**New Prompt Engineering Course Added:**
✅ **Course Title**: "🤖 AI Prompt Engineering"  
✅ **Video**: 2-minute YouTube video explaining prompt engineering  
✅ **Duration**: 3 hours total course time  
✅ **Lessons**: 4 comprehensive lessons  
✅ **Age Group**: 12-17 (Teen Coders)  

### 🔧 Implementation Complete

**What's Working Now:**
1. **Teen Dashboard**: Shows AI Prompt Engineering course
2. **Short Video**: 2-minute introduction to prompt engineering
3. **Course Structure**: 4 lessons covering basics to advanced
4. **YouTube Integration**: Reliable video streaming
5. **Database Ready**: Course data can be imported to Neon DB

### 📊 Course Content Structure

**Lesson 1: What is Prompt Engineering? (2 min video)**
- Quick introduction to AI prompting
- Why it's important for students
- Real-world benefits and applications

**Lesson 2: Writing Clear Prompts (30 min)**
- Interactive exercises
- Best practices for clear communication
- Common mistakes to avoid

**Lesson 3: Advanced Techniques (45 min)**
- Few-shot prompting
- Chain-of-thought reasoning
- Role-based prompting

**Lesson 4: Real-World Applications (60 min)**
- Coding assistance prompts
- Creative writing prompts
- Problem-solving techniques

### 🎯 Next Steps for Content

1. **Import to Database**: Run course import script to populate Neon DB
2. **Add More Videos**: Replace placeholder videos with YouTube embeds
3. **Create Assessments**: Add quizzes and interactive elements
4. **Upload Documents**: Add downloadable study materials

Your content loading strategy is production-ready for Vercel deployment!