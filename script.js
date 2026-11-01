const welcomeScreen=document.getElementById('welcomeScreen');
const enterButton=document.getElementById('enterWebsite');
// Keep the animated brand intro visible until the visitor interacts.
// Desktop: first mouse movement/click. Touch devices: first tap/touch.
if(welcomeScreen && enterButton){
  document.body.classList.add('welcome-open');
  let introFinished=false;
  const finishIntro=()=>{
    if(introFinished) return;
    introFinished=true;
    welcomeScreen.classList.add('leaving');
    document.body.classList.remove('welcome-open');
    window.setTimeout(()=>welcomeScreen.remove(),300);
    window.removeEventListener('pointermove',onFirstPointerMove);
    window.removeEventListener('pointerdown',onFirstPointerDown);
    window.removeEventListener('touchstart',finishIntro);
  };
  const onFirstPointerMove=(event)=>{
    // A real mouse movement dismisses the intro on desktop; touch movement is handled by touchstart/pointerdown.
    if(event.pointerType==='mouse' || event.pointerType==='pen') finishIntro();
  };
  const onFirstPointerDown=()=>finishIntro();
  enterButton.addEventListener('click',finishIntro);
  window.addEventListener('pointermove',onFirstPointerMove,{passive:true});
  window.addEventListener('pointerdown',onFirstPointerDown,{passive:true});
  window.addEventListener('touchstart',finishIntro,{passive:true});
}
const menuButton=document.querySelector('.menu-btn');const navLinks=document.querySelector('.nav-links');menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
const hero=document.querySelector('.hero');const art=document.querySelector('.hero-image');let ticking=false;function scrollEffects(){const rect=hero.getBoundingClientRect();const progress=Math.max(-1,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));if(art){const rotate=3+(progress-.5)*7;const lift=(progress-.5)*-34;art.style.transform=`translate3d(0,${lift}px,0) rotate(${rotate}deg)`;}ticking=false}window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(scrollEffects);ticking=true}},{passive:true});
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{glow.style.left=(e.clientX-140)+'px';glow.style.top=(e.clientY-140)+'px'},{passive:true});
// Gentle 3D tilt on desktop product photos
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.querySelectorAll('.product-photo').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}
// Interactive depth: gentle pointer tilt layered over the slow hero rotation.
const sunflowerHero=document.querySelector('.sunflower-hero');
const sunflowerProduct=document.querySelector('.sunflower-product');
if(sunflowerHero && sunflowerProduct && matchMedia('(hover:hover) and (pointer:fine)').matches){
 sunflowerHero.addEventListener('pointermove',e=>{const r=sunflowerHero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;sunflowerProduct.style.setProperty('--pointer-y',`${x*5}deg`);sunflowerProduct.style.setProperty('--pointer-x',`${-y*4}deg`);});
 sunflowerHero.addEventListener('pointerleave',()=>{sunflowerProduct.style.removeProperty('--pointer-y');sunflowerProduct.style.removeProperty('--pointer-x');});
}

// Product category + price filters and sorting
(()=>{
 const grid=document.getElementById('productGrid'); if(!grid) return;
 const cards=[...grid.querySelectorAll('.product-card')];
 const chips=[...document.querySelectorAll('.filter-chip')];
 const productFilter=document.getElementById('productFilter');
 const priceFilter=document.getElementById('priceFilter');
 const sortSelect=document.getElementById('sortProducts');
 const status=document.getElementById('filterStatus');
 const empty=document.getElementById('noProducts');
 let category='all';
 function updateProducts(){
   const priceMode=priceFilter.value;
   const chosenProduct=productFilter.value;
   cards.forEach(card=>{
     const p=Number(card.dataset.price);
     const productName=card.querySelector('h3')?.textContent.trim() || '';
     const productMatch=chosenProduct==='all'||productName===chosenProduct;
     const categoryMatch=category==='all'||card.dataset.category===category;
     const priceMatch=priceMode==='all'||(priceMode==='under300'&&p<300)||(priceMode==='300to500'&&p>=300&&p<=500)||(priceMode==='over500'&&p>500);
     card.hidden=!(productMatch&&categoryMatch&&priceMatch);
   });
   const visible=cards.filter(c=>!c.hidden);
   const sort=sortSelect.value;
   visible.sort((a,b)=>sort==='low-high'?Number(a.dataset.price)-Number(b.dataset.price):sort==='high-low'?Number(b.dataset.price)-Number(a.dataset.price):cards.indexOf(a)-cards.indexOf(b));
   visible.forEach(card=>grid.appendChild(card));
   status.textContent=visible.length===1?`Showing: ${visible[0].querySelector('h3').textContent.trim()}`:`Showing ${visible.length} of ${cards.length} varieties`;
   empty.hidden=visible.length!==0;
 }
 chips.forEach(chip=>chip.addEventListener('click',()=>{category=chip.dataset.category;chips.forEach(c=>{const active=c===chip;c.classList.toggle('active',active);c.setAttribute('aria-pressed',String(active));});updateProducts();}));
 productFilter.addEventListener('change',()=>{ if(productFilter.value!=='all'){category='all';chips.forEach(c=>{const active=c.dataset.category==='all';c.classList.toggle('active',active);c.setAttribute('aria-pressed',String(active));});} updateProducts(); });
 priceFilter.addEventListener('change',updateProducts);sortSelect.addEventListener('change',updateProducts);
 updateProducts();
})();

// Load product videos only as they approach the viewport. This saves mobile data
// and battery while preserving muted inline playback on Android.
(()=>{
 const videos=[...document.querySelectorAll('video')];
 if(!('IntersectionObserver' in window)){
   videos.forEach(video=>{video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src')});video.load();video.play().catch(()=>{});});
   return;
 }
 const videoObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     const video=entry.target;
     if(entry.isIntersecting){
       let changed=false;
       video.querySelectorAll('source[data-src]').forEach(source=>{source.src=source.dataset.src;source.removeAttribute('data-src');changed=true;});
       if(changed) video.load();
       if(video.hasAttribute('autoplay')) video.play().catch(()=>{});
     }else{
       if(!video.paused) video.pause();
     }
   });
 },{rootMargin:'220px 0px',threshold:.08});
 videos.forEach(video=>videoObserver.observe(video));
})();

// Installable Android web app (PWA). GitHub Pages serves it over HTTPS.
let installPromptEvent=null;
const installButton=document.getElementById('installApp');
window.addEventListener('beforeinstallprompt',event=>{
 event.preventDefault();
 installPromptEvent=event;
 if(installButton) installButton.hidden=false;
});
if(installButton){
 installButton.addEventListener('click',async()=>{
   if(!installPromptEvent){
     alert('Chrome menu (⋮) kholkar “Install app” ya “Add to Home screen” choose karein.');
     return;
   }
   installPromptEvent.prompt();
   await installPromptEvent.userChoice;
   installPromptEvent=null;
   installButton.hidden=true;
 });
}
window.addEventListener('appinstalled',()=>{if(installButton) installButton.hidden=true;});
if('serviceWorker' in navigator && location.protocol!=='file:'){
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Offline support unavailable:',error)));
}


// Product order selection: email orders are available for every selection;
// the WhatsApp number/CTA appears only for bulk orders (3+ units total).
(()=>{
 const grid=document.getElementById('productGrid');
 const panel=document.getElementById('orderPanel');
 if(!grid || !panel) return;
 const cards=[...grid.querySelectorAll('.product-card')];
 const lines=document.getElementById('orderLines');
 const countLabel=document.getElementById('orderItemCount');
 const totalLabel=document.getElementById('orderTotal');
 const summaryField=document.getElementById('orderSummaryField');
 const totalField=document.getElementById('orderTotalField');
 const quantityField=document.getElementById('orderQuantityField');
 const bulkBox=document.getElementById('bulkOrderBox');
 const bulkButton=document.getElementById('bulkWhatsAppButton');
 const orderForm=document.getElementById('productOrderForm');
 const clearButton=document.getElementById('clearOrder');
 const customerName=orderForm.querySelector('[name="customer_name"]');
 const customerEmail=orderForm.querySelector('[name="email"]');
 const customerPhone=orderForm.querySelector('[name="customer_phone"]');
 const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
 const getQty=card=>Number(card.querySelector('.quantity-value').textContent)||0;
 function chosenItems(){return cards.map(card=>({
   name:card.querySelector('h3')?.textContent.trim()||'Product',
   price:Number(card.dataset.price)||0,
   qty:getQty(card)
 })).filter(item=>item.qty>0)}
 function render(){
   const items=chosenItems();
   const totalQty=items.reduce((sum,item)=>sum+item.qty,0);
   const total=items.reduce((sum,item)=>sum+item.qty*item.price,0);
   panel.hidden=totalQty===0;
   lines.replaceChildren();
   items.forEach(item=>{
     const row=document.createElement('div'); row.className='order-line';
     const name=document.createElement('span'); name.textContent=`${item.name} × ${item.qty}`;
     const amount=document.createElement('strong'); amount.textContent=fmt(item.price*item.qty);
     row.append(name,amount); lines.append(row);
   });
   countLabel.textContent=`${totalQty} ${totalQty===1?'item':'items'} selected`;
   totalLabel.textContent=`Estimated total: ${fmt(total)}`;
   const summary=items.map(item=>`${item.name} x ${item.qty} — ${fmt(item.price*item.qty)} (starting price)`).join('\n');
   summaryField.value=summary;
   totalField.value=`${fmt(total)} (estimated starting total; final quote to be confirmed)`;
   quantityField.value=String(totalQty);
   const isBulk=totalQty>=3;
   bulkBox.hidden=!isBulk;
   const personName=customerName.value.trim()||'Not provided';
   const email=customerEmail.value.trim()||'Not provided';
   const phone=customerPhone.value.trim()||'Not provided';
   const message=[
     'Hello Minimal By Two Cuties! I would like to place a BULK order.',
     '', 'Order items:', summary, '',
     `Estimated starting total: ${fmt(total)}`,
     `Name: ${personName}`, `Email: ${email}`, `Phone: ${phone}`,
     '', 'Please confirm availability and final pricing. Thank you!'
   ].join('\n');
   bulkButton.href='https://wa.me/918269820509?text='+encodeURIComponent(message);
 }
 cards.forEach(card=>{
   const output=card.querySelector('.quantity-value');
   card.querySelectorAll('[data-qty-change]').forEach(button=>button.addEventListener('click',()=>{
     const next=Math.max(0,Math.min(99,getQty(card)+Number(button.dataset.qtyChange)));
     output.textContent=String(next); render();
   }));
 });
 [customerName,customerEmail,customerPhone].forEach(input=>input.addEventListener('input',render));
 clearButton.addEventListener('click',()=>{
   cards.forEach(card=>card.querySelector('.quantity-value').textContent='0');
   render();
 });
 orderForm.addEventListener('submit',event=>{
   if(chosenItems().length===0){event.preventDefault(); alert('Please select at least one product first.'); return;}
   render();
 });
 render();
})();

// Small confirmation after the email form redirects back from FormSubmit.
(()=>{
 const params=new URLSearchParams(location.search);
 let message='';
 if(params.get('order')==='sent') message='Thank you! Your order enquiry has been sent. We’ll reply by email.';
 if(params.get('custom')==='sent') message='Your Custom Craft idea has been sent. We can’t wait to read it!';
 if(!message) return;
 const notice=document.createElement('div'); notice.className='submission-toast'; notice.setAttribute('role','status'); notice.textContent=message;
 document.body.appendChild(notice);
 window.setTimeout(()=>notice.classList.add('show'),50);
})();
