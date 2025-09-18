    //location js
    //-----------------------------------------------------------------------------------
    //****************************************************************************** */
    //----------------------------------------------------------------------------------
        const mapButton = document.querySelectorAll(".map-button");
        const mapAccordionContainer = document.querySelectorAll(".mapAccordion-container");
        mapButton.forEach((element,index) => {
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                
                if(element.classList.contains("mapButton-active")){
                    return;
                }

                element.classList.add("mapButton-active");
                mapAccordionContainer[index].classList.add("mapAccordionContainer-active");

                const i = (index + 1) % mapButton.length;
                mapButton[i].classList.remove("mapButton-active");
                mapAccordionContainer[i].classList.remove("mapAccordionContainer-active");
            })
        });

        const accrodionContainer = document.querySelectorAll(".map-connectivity-section");
        const accordionContent = document.querySelectorAll(".map-connectivity-content");
        const accordionContentPlaceholder = document.querySelectorAll(".map-connectivity-showmore");
        let connectivityCounter = 0;
        let connectivityTimer = setInterval(connectivityCollapse,5000);

        function connectivityCollapse() {
            accordionContentPlaceholder[connectivityCounter].classList.remove("showhide");
            accordionContent[connectivityCounter].classList.remove("map-active");
            
            
            increaseConnectivityCount();

            accordionContentPlaceholder[connectivityCounter].classList.add("showhide");
            setTimeout(()=>{
                accordionContent[connectivityCounter].classList.add("map-active");
            },300)
        }
        function increaseConnectivityCount() {
            connectivityCounter = (connectivityCounter + 1) % accrodionContainer.length;
        }
        function resetConnectivityCounter() {
            clearInterval(connectivityTimer);
            connectivityTimer = setInterval(connectivityCollapse,5000);
        }

        accrodionContainer.forEach((element,index)=>{
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                for(i=0;i<accrodionContainer.length;i++){
                    accordionContentPlaceholder[i].classList.remove("showhide");
                    accordionContent[i].classList.remove("map-active");
                }
                resetConnectivityCounter();
                connectivityCounter = index;
                accordionContentPlaceholder[connectivityCounter].classList.add("showhide");
                setTimeout(()=>{
                    accordionContent[connectivityCounter].classList.add("map-active");
                },300);
            });
        });



        //Amenities Js
        //***********************************************************************
        // ---------------------------------------------------------------------
        // ******************************************************************* */
        class AmenitiesCarousel {
            constructor() {
                // Get the original slides
                this.originalSlides = Array.from(document.querySelectorAll('.amenities-slide'));
                this.amenitiesTotalSlides = this.originalSlides.length;
                
                // Store data for lightbox
                this.amenitiesImages = [];
                this.amenitiesTexts = [];
                
                // Extract data from original slides
                this.originalSlides.forEach(slide => {
                    const img = slide.querySelector('.amenities-image');
                    const text = slide.querySelector('.amenities-text-overlay');
                    this.amenitiesImages.push(img.src);
                    this.amenitiesTexts.push(text.textContent);
                    
                    // Add error handling for images
                    img.onerror = () => {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MDAgMzAwQzQwMCAzNTUuMjI4IDM1NS4yMjggNDAwIDMwMCA0MDBDMjQ0Ljc3MiA0MDAgMjAwIDM1NS4yMjggMjAwIDMwMEMyMDAgMjQ0Ljc3MiAyNDQuNzcyIDIwMCAzMDAgMjAwQzM1NS4yMjggMjAwIDQwMCAyNDQuNzcyIDQwMCAzMDBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3MjhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD4KPC9zdmc+';
                    };
                });
                
                // Setup carousel variables
                this.amenitiesCurrentIndex = 0;
                this.amenitiesTrack = document.getElementById('amenitiesTrack');
                // this.amenitiesDotsContainer = document.getElementById('amenitiesDots');
                this.amenitiesPrevBtn = document.getElementById('amenitiesPrev');
                this.amenitiesNextBtn = document.getElementById('amenitiesNext');
                this.amenitiesAutoPlayInterval = null;
                this.amenitiesIsTransitioning = false;
                
                // Calculate starting position for seamless infinite scroll
                this.amenitiesPosition = this.amenitiesTotalSlides;
                
                // Lightbox elements
                this.amenitiesLightbox = document.getElementById('amenitiesLightbox');
                this.amenitiesLightboxImage = document.getElementById('amenitiesLightboxImage');
                this.amenitiesLightboxClose = document.getElementById('amenitiesLightboxClose');
                this.amenitiesLightboxPrev = document.getElementById('amenitiesLightboxPrev');
                this.amenitiesLightboxNext = document.getElementById('amenitiesLightboxNext');
                this.amenitiesLightboxCounter = document.getElementById('amenitiesLightboxCounter');
                this.amenitiesLightboxTitle = document.getElementById('amenitiesLightboxTitle');
                this.amenitiesLightboxCurrentIndex = 0;
                
                // Initialize the carousel
                this.amenitiesInit();
            }
            
            amenitiesInit() {
                // Clone slides for infinite effect
                this.amenitiesCloneSlides();
                
                // Create dots
                // this.amenitiesCreateDots();
                
                // Bind events
                this.amenitiesBindEvents();
                this.amenitiesBindLightboxEvents();
                
                // Position the carousel
                this.amenitiesUpdateCarousel();
                
                // Start autoplay
                this.amenitiesStartAutoPlay();
            }
            
            amenitiesCloneSlides() {
                // Create clones for infinite scrolling effect
                const fragmentStart = document.createDocumentFragment();
                const fragmentEnd = document.createDocumentFragment();
                
                // Clone first 3 slides to the end
                for (let i = 0; i < 3; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentEnd.appendChild(clone);
                }
                
                // Clone last 3 slides to the beginning
                for (let i = this.amenitiesTotalSlides - 3; i < this.amenitiesTotalSlides; i++) {
                    const clone = this.originalSlides[i].cloneNode(true);
                    fragmentStart.appendChild(clone);
                }
                
                // Append clones to track
                this.amenitiesTrack.prepend(fragmentStart);
                this.amenitiesTrack.appendChild(fragmentEnd);
                
                // Setup image click events for all slides
                this.amenitiesSetupImageClickEvents();
            }
            
            /*amenitiesSetupImageClickEvents() {
                const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                slides.forEach((slide, index) => {
                    const img = slide.querySelector('.amenities-image');
                    img.addEventListener('click', () => {
                     const totalSlides = slides.length;
                        const originalIndex = (index - 2 + totalSlides) % this.amenitiesTotalSlides;
                        this.openAmenitiesLightbox(originalIndex);
                    });
                });
            }*/
//            amenitiesSetupImageClickEvents() {
//     const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
//     slides.forEach((slide, index) => {
//         const img = slide.querySelector('.amenities-image');
//         img.addEventListener('click', () => {
//             console.log(index,this.amenitiesTotalSlides);
//             const originalIndex = (index) % (this.amenitiesTotalSlides);
//             console.log(originalIndex);
//             this.openAmenitiesLightbox(originalIndex);
//         });
//     });
// }
amenitiesSetupImageClickEvents() {
        const slides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
        slides.forEach((slide, index) => {
            const img = slide.querySelector('.amenities-image');
            // Remove previous event listener to prevent duplicates
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);

            // Add the new event listener
            newImg.addEventListener('click', () => {
                let originalIndex = index - 3;
                if (originalIndex < 0) {
                    originalIndex = this.amenitiesTotalSlides + originalIndex;
                } else if (originalIndex >= this.amenitiesTotalSlides) {
                    originalIndex = originalIndex - this.amenitiesTotalSlides;
                }
                this.openAmenitiesLightbox(originalIndex);
            });
        });
    }

            
            // amenitiesCreateDots() {
            //     for (let i = 0; i < this.amenitiesTotalSlides; i++) {
            //         const amenitiesDot = document.createElement('button');
            //         amenitiesDot.className = 'amenities-dot';
            //         amenitiesDot.addEventListener('click', () => this.amenitiesGoToSlide(i));
            //         this.amenitiesDotsContainer.appendChild(amenitiesDot);
            //     }
            // }
            
            amenitiesBindEvents() {
                this.amenitiesPrevBtn.addEventListener('click', () => this.amenitiesPrevSlide());
                this.amenitiesNextBtn.addEventListener('click', () => this.amenitiesNextSlide());
                
                // Touch events for mobile
                let amenitiesStartX = 0;
                let amenitiesEndX = 0;
                
                this.amenitiesTrack.addEventListener('touchstart', (e) => {
                    amenitiesStartX = e.touches[0].clientX;
                },{passive:true});
                
                this.amenitiesTrack.addEventListener('touchend', (e) => {
                    amenitiesEndX = e.changedTouches[0].clientX;
                    const amenitiesDiff = amenitiesStartX - amenitiesEndX;
                    
                    if (Math.abs(amenitiesDiff) > 50) {
                        if (amenitiesDiff > 0) {
                            this.amenitiesNextSlide();
                        } else {
                            this.amenitiesPrevSlide();
                        }
                    }
                },{passive:true});
                
                // Pause autoplay on hover
                this.amenitiesTrack.addEventListener('mouseenter', () => this.amenitiesStopAutoPlay());
                this.amenitiesTrack.addEventListener('mouseleave', () => this.amenitiesStartAutoPlay());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.amenitiesPrevSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.amenitiesNextSlide();
                    } else if (e.key === 'Escape' && this.amenitiesLightbox.classList.contains('active')) {
                        this.closeAmenitiesLightbox();
                    }
                });
            }
            
            amenitiesBindLightboxEvents() {
                // Close lightbox events
                this.amenitiesLightboxClose.addEventListener('click', () => this.closeAmenitiesLightbox());
                this.amenitiesLightbox.addEventListener('click', (e) => {
                    if (e.target === this.amenitiesLightbox) {
                        this.closeAmenitiesLightbox();
                    }
                });
                
                // Lightbox navigation
                this.amenitiesLightboxPrev.addEventListener('click', () => this.amenitiesLightboxPrevImage());
                this.amenitiesLightboxNext.addEventListener('click', () => this.amenitiesLightboxNextImage());
            }
            
            openAmenitiesLightbox(index) {
                this.amenitiesLightboxCurrentIndex = index;
                this.amenitiesLightboxImage.src = this.amenitiesImages[index];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[index];
                this.updateAmenitiesLightboxCounter();
                this.amenitiesLightbox.classList.add('active');
                this.amenitiesStopAutoPlay();
                document.body.style.overflow = 'hidden';
            }
            
            closeAmenitiesLightbox() {
                this.amenitiesLightbox.classList.remove('active');
                this.amenitiesStartAutoPlay();
                document.body.style.overflow = 'auto';
            }
            
            amenitiesLightboxPrevImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            amenitiesLightboxNextImage() {
                this.amenitiesLightboxCurrentIndex = (this.amenitiesLightboxCurrentIndex + 1) % this.amenitiesTotalSlides;
                this.amenitiesLightboxImage.src = this.amenitiesImages[this.amenitiesLightboxCurrentIndex];
                this.amenitiesLightboxTitle.textContent = this.amenitiesTexts[this.amenitiesLightboxCurrentIndex];
                this.updateAmenitiesLightboxCounter();
            }
            
            updateAmenitiesLightboxCounter() {
                this.amenitiesLightboxCounter.textContent = `${this.amenitiesLightboxCurrentIndex + 1} / ${this.amenitiesTotalSlides}`;
            }
            
            amenitiesUpdateCarousel() {
                const amenitiesSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide');
                // const amenitiesDots = this.amenitiesDotsContainer.querySelectorAll('.amenities-dot');
                
                // Calculate which slide is in the center
                const amenitiesIsMobile = window.innerWidth <= 576;
                const amenitiesCenterIndex = amenitiesIsMobile ? 
                    this.amenitiesPosition + 1 : 
                    this.amenitiesPosition + 1;
                
                // Update center slide highlighting
                amenitiesSlides.forEach((slide, index) => {
                    slide.classList.remove('amenities-center');
                    if (index === amenitiesCenterIndex) {
                        slide.classList.add('amenities-center');
                    }
                });
                
                // Update active dot
                // amenitiesDots.forEach((dot, index) => {
                //     dot.classList.remove('amenities-active');
                //     if (index === this.amenitiesCurrentIndex) {
                //         dot.classList.add('amenities-active');
                //     }
                // });
                
                // Move carousel
                const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                const amenitiesTranslateX = -(this.amenitiesPosition * amenitiesSlideWidth);
                this.amenitiesTrack.style.transform = `translateX(${amenitiesTranslateX}%)`;
            }
            
            amenitiesNextSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition++;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex + 1) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                    if (this.amenitiesPosition >= totalSlides - 3) {
                        this.amenitiesTrack.style.transition = 'none';
                        this.amenitiesPosition = 3;
                        
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesPrevSlide() {
                if (this.amenitiesIsTransitioning) return;
                this.amenitiesIsTransitioning = true;
                
                this.amenitiesPosition--;
                this.amenitiesCurrentIndex = (this.amenitiesCurrentIndex - 1 + this.amenitiesTotalSlides) % this.amenitiesTotalSlides;
                
                this.amenitiesUpdateCarousel();
                
                // Reset position for seamless infinite scroll
                setTimeout(() => {
                    if (this.amenitiesPosition <= 0) {
                        this.amenitiesTrack.style.transition = 'none';
                        const totalSlides = this.amenitiesTrack.querySelectorAll('.amenities-slide').length;
                        this.amenitiesPosition = totalSlides - 6;
                        const amenitiesIsMobile = window.innerWidth <= 576;
                        const amenitiesSlideWidth = amenitiesIsMobile ? 100 : 33.333;
                        this.amenitiesTrack.style.transform = `translateX(-${this.amenitiesPosition * amenitiesSlideWidth}%)`;
                        
                        setTimeout(() => {
                            this.amenitiesTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        }, 50);
                    }
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesGoToSlide(index) {
                if (this.amenitiesIsTransitioning || index === this.amenitiesCurrentIndex) return;
                
                this.amenitiesIsTransitioning = true;
                
                // Calculate the difference
                const diff = index - this.amenitiesCurrentIndex;
                this.amenitiesPosition += diff;
                this.amenitiesCurrentIndex = index;
                
                this.amenitiesUpdateCarousel();
                
                setTimeout(() => {
                    this.amenitiesIsTransitioning = false;
                }, 600);
            }
            
            amenitiesStartAutoPlay() {
                this.amenitiesStopAutoPlay();
                this.amenitiesAutoPlayInterval = setInterval(() => {
                    this.amenitiesNextSlide();
                }, 5000);
            }
            
            amenitiesStopAutoPlay() {
                if (this.amenitiesAutoPlayInterval) {
                    clearInterval(this.amenitiesAutoPlayInterval);
                    this.amenitiesAutoPlayInterval = null;
                }
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new AmenitiesCarousel();
        });










        //-----------------------------------------
        //************************************** */
        //----------Gallery JS ----------------------
       document.addEventListener("DOMContentLoaded",()=>{
        const galleryImages = document.querySelectorAll(".galleryImage");
        const galleryLightboxContainer = document.querySelector(".gallery-lightboxContainer-overlay");
        const galleryImageHolder = document.querySelector(".gallery-lightbox-Imageholder");
        const galleryLightboxIndicator = document.querySelector(".gallery-lightBoxIndicator");
        const body = document.querySelector('body');
        let galleryIndex = 0;
        const gallerycount = galleryImages.length + 1;

        if(galleryImages.length>6){
          const overlay = document.createElement("div");
          overlay.className = "galleryOverlay";
          galleryImages[5].addEventListener("load",()=>{
            overlay.style.width = galleryImages[5].clientWidth + "px";
            overlay.style.height = galleryImages[5].clientHeight + "px";
          })
          document.querySelectorAll(".gallery-imageWrapper")[5].appendChild(overlay);


          const galleryMoreMsg = document.createElement("div");
          galleryMoreMsg.className = "gallery-moreMsg";
          galleryMoreMsg.innerHTML = "+"+ (gallerycount-7)+" more";
          galleryImages[5].addEventListener("load",()=>{
            galleryMoreMsg.style.height = galleryImages[5].clientHeight + "px";
            galleryMoreMsg.style.width = galleryImages[5].clientWidth + "px";
          })
          document.querySelectorAll(".gallery-imageWrapper")[5].appendChild(galleryMoreMsg);


          window.addEventListener("resize",(e)=>{
            e.preventDefault();
            document.querySelector(".galleryOverlay").style.width = galleryImages[5].clientWidth + "px";
            document.querySelector(".galleryOverlay").style.height = galleryImages[5].clientHeight + "px";


            document.querySelector(".gallery-moreMsg").style.width = galleryImages[5].clientWidth + "px";
            document.querySelector(".gallery-moreMsg").style.height = galleryImages[5].clientHeight + "px";
          })
          
        }

        galleryImages.forEach((element,index)=>{
          element.addEventListener("click",(e)=>{
            e.preventDefault();
            galleryIndex = index;
            galleryLightboxImageChange();
            galleryLightboxContainer.style.display = "block";
            body.style.overflowY = "hidden";
            document.addEventListener("keydown",galleryKeyHandler)
          })
        });

        function galleryLightboxPrev() {
          galleryIndex = (galleryIndex - 1 + gallerycount) % gallerycount;
          galleryLightboxImageChange();
        }

        function galleryLightboxNext() {
          galleryIndex = (galleryIndex + 1) % gallerycount;
          galleryLightboxImageChange();
        }

        function galleryLightboxClose() {
          galleryLightboxContainer.style.display = "none";
          body.style.overflowY = "visible";
          document.removeEventListener("keydown",galleryKeyHandler);
        }

        document.querySelector(".gallery-lightbox-close").addEventListener("click",(e)=>{
          e.preventDefault();
          galleryLightboxClose();
        })

        document.querySelector(".gallery-lightbox-left").addEventListener("click",(e)=>{
          e.preventDefault();
          galleryLightboxPrev();
        });

        document.querySelector(".gallery-lightbox-right").addEventListener("click",(e)=>{
          e.preventDefault();
          galleryLightboxNext();
        });

        function galleryLightboxImageChange () {
          if (galleryIndex == galleryImages.length) {
            galleryImageHolder.classList.add("galleryImageHide");
            galleryLightboxIndicator.innerHTML = "";
          }
          else {
            galleryImageHolder.classList.remove("galleryImageHide");
            galleryImageHolder.src = galleryImages[galleryIndex].src;
            galleryLightboxIndicator.innerHTML = (galleryIndex + 1) + " / " + (gallerycount - 1) ;
          }
        }


        function galleryKeyHandler(e) {
          if (e.key=="ArrowLeft") {
            galleryLightboxPrev();
          }
          else if (e.key=="ArrowRight") {
            galleryLightboxNext();
          }
          else if (e.key=="Escape") {
            galleryLightboxClose();
          }
        }

        galleryLightboxContainer.addEventListener("click",(e)=>{
          e.preventDefault();
          if (e.target == galleryLightboxContainer) {
            galleryLightboxClose();
          }
        })
        let galleryStartX = 0;
        galleryLightboxContainer.addEventListener("touchstart",(e)=>{
          
          galleryStartX = e.touches[0].clientX;
        },{passive:true})

        galleryLightboxContainer.addEventListener("touchend",(e)=>{
          
          const galleryEndX = e.changedTouches[0].clientX;
          if (galleryEndX < galleryStartX - 50){
            galleryLightboxPrev();
          }
          else if (galleryEndX > galleryStartX + 50) {
            galleryLightboxNext();
          }
        },{passive:true})
       })  //document.domcontentload close







        //-----------------------------------------
        //************************************** */
        //----------Floor and price JS ----------------------

        const floorcardlength = document.querySelectorAll(".floorcard").length;
        let floorIndex = 0;
        let floortimer = setInterval(beginFloorCarousel,3000);

        function beginFloorCarousel() {
            floorIndex = (floorIndex + 1 ) % floorcardlength;
            slidefloorCarousel();
        }

        document.querySelector(".floorplan-prev").addEventListener("click",(e)=>{
            e.preventDefault();
            floorIndex = (floorIndex + floorcardlength - 1) % floorcardlength ;
            slidefloorCarousel();
            resetfloortimer();
        })

        document.querySelector(".floorplan-next").addEventListener("click",(e)=>{
            e.preventDefault();
            floorIndex = (floorIndex + 1) % floorcardlength;
            slidefloorCarousel();
            resetfloortimer();
        })

        function slidefloorCarousel(){
            document.querySelector(".floorplanCarousel").style.transform = `translateX(-${floorIndex*100}%)`;
        }
        function resetfloortimer() {
            clearInterval(floortimer);
            floortimer = setInterval(beginFloorCarousel,3000);
        }

        const track = document.querySelector(".floorplanCarousel"); // or main container
let touchStartX = 0;
let touchEndX = 0;

// handle touch start
track.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

// handle touch end
track.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  // threshold to avoid accidental taps
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      // swipe right → prev
      floorIndex = (floorIndex + floorcardlength - 1) % floorcardlength;
    } else {
      // swipe left → next
      floorIndex = (floorIndex + 1) % floorcardlength;
    }

    slidefloorCarousel();
    resetfloortimer();
  }
}


/******************************************* */
//-----------Overview -------------------------
/******************************************* */


        document.querySelectorAll(".readMoreLink").forEach((element,index)=>{
            element.addEventListener("click",(e)=>{
                e.preventDefault();
                const clamp = document.querySelectorAll(".clampText")[index];
                if (clamp.classList.contains("clampText-overflow")) {
                    clamp.classList.remove("clampText-overflow");
                    element.innerHTML = "Read More ▶";
                }
                else {
                    clamp.classList.add("clampText-overflow");
                    element.innerHTML = "Read Less ◄";
                }
            })
        })





        setInterval(updateBannerCorousel,5000);

let bannerImage = document.querySelectorAll(".bannerImage");
let bannerContainer = document.querySelector(".banner");
let bannertransform = 0;
let bannercount = 0;
function updateBannerCorousel() {
    bannerContainer.style.transform =  `translateX(-${bannercount*100}%)`;
    bannercount+=1;
    if (bannercount>bannerImage.length-1){
        bannercount=0;
    }
}

document.getElementById("burgerMenu").addEventListener("click", function () {
  document.getElementById("burgerMenu").classList.toggle("mobMenuOpen");
  document.getElementById("navModal").classList.toggle("navModal-active");
});

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("navModal").style.top = (document.querySelector("header").clientHeight + 5) + "px";
})
window.addEventListener("resize",()=>{
    document.getElementById("navModal").style.top = (document.querySelector("header").clientHeight + 5) + "px";
})

window.addEventListener("scroll", function () {
        let e = document.getElementById("navbar");
        window.scrollY > 30 ? e.classList.add("scrollednav") : e.classList.remove("scrollednav");
    });


document.querySelectorAll(".nav-button").forEach(element=>{
    element.addEventListener("click",(e)=>{
        e.preventDefault();
        const target = e.target.getAttribute("href");
        if (document.querySelector(".navModal").classList) {
            document.getElementById("burgerMenu").classList.toggle("mobMenuOpen");
            document.getElementById("navModal").classList.toggle("navModal-active");
        }
        if (target === "#") {
            console.log("trigger popup");
            return;
        }
        const targetsection = document.getElementById(target.substring(1));
        targetsection.scrollIntoView({
            behavior: "smooth",
        })
    })
})