import{a as f,S as h,i as n}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const m of a.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&e(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const L="44808293-64f6d68c9109520376c76cf92",w="https://pixabay.com/api/";async function u(s,r=1,o=15){try{return(await f.get(`${w}`,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:o}})).data}catch(e){throw console.error("Error fetching images:",e),e}}function p(s){const r=document.getElementById("gallery"),o=s.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="info">
                <p>Likes: <br /><span>${e.likes}</span></p>
                <p>Views: <br /><span>${e.views}</span></p>
                <p>Comments: <br /><span>${e.comments}</span></p>
                <p>Downloads: <br /><span>${e.downloads}</span></p>
            </div>
        </li>
    `).join("");r.insertAdjacentHTML("beforeend",o),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function b(){const s=document.getElementById("gallery");s.innerHTML=""}const v=document.getElementById("search-form"),i=document.getElementById("load-more"),d=document.getElementById("loader");let c="",l=1;const g=15;let y=0;v.addEventListener("submit",async s=>{if(s.preventDefault(),c=s.target.elements.query.value.trim(),c===""){n.error({title:"Error",message:"Please enter a search query."});return}l=1,b(),i.classList.add("is-hidden"),d.classList.remove("is-hidden");try{const r=await u(c,l,g);y=r.totalHits,r.hits.length===0?n.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):(p(r.hits),r.hits.length<y&&i.classList.remove("is-hidden"))}catch{n.error({title:"Error",message:"Something went wrong. Please try again."})}finally{d.classList.add("is-hidden")}});i.addEventListener("click",async()=>{l+=1,d.classList.remove("is-hidden"),i.classList.add("is-hidden");try{const s=await u(c,l,g);p(s.hits),l*g>=y?n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}):i.classList.remove("is-hidden");const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*4,behavior:"smooth"}),console.log(e)}catch{n.error({title:"Error",message:"Something went wrong. Please try again."})}finally{d.classList.add("is-hidden")}});
//# sourceMappingURL=commonHelpers.js.map
