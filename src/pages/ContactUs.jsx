
export default function ContactUs() {
 return (
  <div className="contact-container">

   <div className="contact-box">
    <h2>تواصل معنا</h2>

    <div className="contact-item">
     <span>📧</span>
     <div>
      <p><strong>البريد الإلكتروني</strong></p>
      <p>support@mansouraroutes.com</p>
     </div>
    </div>

    <div className="contact-item">
     <span>📞</span>
     <div>
      <p><strong>رقم الهاتف</strong></p>
      <p>+20 123 456 7890</p>
     </div>
    </div>

    <div className="contact-item">
     <span>📍</span>
     <div>
      <p><strong>الموقع</strong></p>
      <p>المنصورة، مصر</p>
     </div>
    </div>
   </div>
   <div className="contact-box">
    <h2>أرسل لنا رسالة ✈️</h2>
    <form>
     <div className="row">
      <div>
       <label >البريد الإلكتروني</label>
       <input type="email" placeholder="your.email@example.com" />
      </div>
      <div>
       <label>الاسم</label>
       <input type="text" placeholder="الاسم بالكامل" />
      </div>
     </div>

     <label>الموضوع</label>
     <input type="text" placeholder="ما هو موضوع الرسالة؟" />

     <label>الرسالة</label>
     <textarea placeholder="اخبرنا المزيد عن استفسارك..." rows="5"></textarea>

     <button type="submit">إرسال الرسالة ✈️</button>
    </form>
   </div>

  </div>

 );
}