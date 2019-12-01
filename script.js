class JukeBox
{
    constructor(_element)
    {
        this.element = _element
        this.audioElement = this.element.querySelector('.js-audio-music')
        this.soundElement = this.element.querySelector('.js-audio-sound')
        this.songCovers = this.element.querySelectorAll('.js-songCover')
        this.equalizerElements = this.element.querySelectorAll('.js-bar')
        this.songElements = ["sounds/caravan-palace-lone-digger.mp3", "sounds/caravan-palace-miracle.mp3", "sounds/caravan-palace-dramophone.mp3", "sounds/caravan-palace-plume.mp3", "sounds/caravan-palace-rock-it-for-me.mp3", "sounds/caravan-palace-wonderland.mp3", "sounds/ours-samplus-le-parjure.mp3", "sounds/ours-samplus-like-the-sunshine.mp3", "sounds/ours-samplus-swingapour.mp3", "sounds/ours-samplus-trouble.mp3"]
         
        this.nameSongElement = ["Lone Digger - Caravan Palace", "Miracle - Caravan Palace", "Dramophone - Caravan Palace", "Plume - Caravan Palace", "Rock It For Me - Caravan Palace", "Wonderland - Caravan Palace", "Le Parjure - Ours Samplus", "Like The Sun Shine - Ours Samplus", "Swingapour - Ours Samplus", "Trouble - Ours Samplus"]
        this.activeSong = Math.floor(Math.random()*(this.songElements.length - 1))
        this.isPlaying = false
         

        this.setPlayPause()
        this.changeSong()
        this.setVolume()
        this.setSeekBar()
        
    }

    setPlayPause()
    {
        const instructionsElement = this.element.querySelector('.js-instructionsContainer')
        this.audioElement.src = this.songElements[this.activeSong]
        //Play
        const playElement = this.element.querySelector('.js-playButton')
        playElement.addEventListener('click', () =>
        {
            this.soundElement.play()
            this.isPlaying = true
            instructionsElement.style.opacity = 0
            setTimeout(() => 
            {
                this.audioElement.play()
                for(const bar of this.equalizerElements){
                    bar.style.animationPlayState = 'running'
                }
                this.songCovers[this.activeSong].style.opacity = 1
                playElement.style.opacity = 0
                playElement.style.zIndex = 0
            }
            ,800)    
        }) 
        
        //Pause
        const pauseElement = this.element.querySelector('.js-pauseButton')
        pauseElement.addEventListener('click', () =>
        {
            this.audioElement.pause()
            for(const bar of this.equalizerElements){
                bar.style.animationPlayState = 'paused'
            }
            playElement.style.opacity = 1
            playElement.style.zIndex = 2
        })
    }

    changeSong()
    {
        //Previous Song
        const backElement = this.element.querySelector('.js-skipbackVinyle')
        backElement.addEventListener('click', () =>
        {
            this.songCovers[this.activeSong].style.opacity = 0
            if(this.activeSong==0)
            {
                this.activeSong = this.songElements.length - 1
                this.audioElement.src = this.songElements[this.activeSong]
                this.soundElement.play()
                setTimeout(() => 
                {
                    this.audioElement.play()
                    this.songCovers[this.activeSong].style.opacity = 1
                },800)   
            }

            else 
            {
                this.activeSong --
                this.audioElement.src = this.songElements[this.activeSong]
                this.soundElement.play()
                setTimeout(() => 
                {
                    this.audioElement.play()
                    this.songCovers[this.activeSong].style.opacity = 1
                },800)  
            }
        })

        //Next Song
        const nextElement = this.element.querySelector('.js-skipnextVinyle')
        nextElement.addEventListener('click', () =>
        {
            this.songCovers[this.activeSong].style.opacity = 0
            if(this.activeSong == this.songElements.length-1)
            {
                this.activeSong = 0
                this.audioElement.src = this.songElements[this.activeSong]
                this.soundElement.play()
                setTimeout(() => 
                {
                    this.audioElement.play()
                    this.songCovers[this.activeSong].style.opacity = 1
                },800)    
            }

            else
            {
                this.activeSong ++
                this.audioElement.src = this.songElements[this.activeSong]
                this.soundElement.play()
                setTimeout(() => 
                {
                    this.audioElement.play()
                    this.songCovers[this.activeSong].style.opacity = 1
                },800)  
            }
        })
    }

    
    setVolume()
    {
        const volumeElements = this.element.querySelectorAll('.js-volume')
        const volumeMuteElement = this.element.querySelector('.js-mute')
        const volumeMaxElement = this.element.querySelector('.js-max')
        for (let k = 0; k < volumeElements.length; k++) 
        {
            volumeElements[k].addEventListener('click', ()=>
            {
                for (let l = 0; l < k+2; l++) 
                {
                    volumeElements[l].classList.add('color-the-selection')
                }

                for (let m = k+1; m < volumeElements.length; m++) 
                {
                    volumeElements[m].classList.remove('color-the-selection')
                }

                if (k==0)
                {
                    this.audioElement.volume = 0.2
                }
                else if (k==1)
                {
                    this.audioElement.volume = 0.4
                }
                else if (k==2)
                {
                    this.audioElement.volume = 0.6
                }
                else if (k==3)
                {
                    this.audioElement.volume = 0.8
                }
                else 
                {
                    this.audioElement.volume = 1
                }
             }) 
             
            volumeMuteElement.addEventListener('click', () => 
            {
                for(const v_element of volumeElements)
                {
                    v_element.classList.remove('color-the-selection')
                }
                this.audioElement.volume = 0
            }) 

            volumeMaxElement.addEventListener('click', () => 
            {
                for(const v_element of volumeElements)
                {
                    v_element.classList.add('color-the-selection')
                }
                this.audioElement.volume = 1
            })
        }
    }
    
    
    
    setSeekBar()
    {
        const secondsElement = this.element.querySelector('.js-seconds')
        const seekBarElement = this.element.querySelector('.js-seekBarDragDrop')
        const dragElement = this.element.querySelector('.js-drag')
        const currentTElement = this.element.querySelector('.js-currentT')
        const durationTElement = this.element.querySelector('.js-durationT')
        const bounding = seekBarElement.getBoundingClientRect()
        let isdraged = false
         
    

        this.audioElement.addEventListener('timeupdate', () =>
        {
            const ratio1 = (this.audioElement.currentTime * 360) / this.audioElement.duration
            const ratio2 = (this.audioElement.currentTime * bounding.width) / this.audioElement.duration
            secondsElement.style.transform = `rotate(${ratio1}deg)`
            dragElement.style.transform = `translateX(${ratio2}px)`
            if(this.isPlaying == true)
            {
                currentTElement.textContent = formatTime(this.audioElement.currentTime)
                durationTElement.textContent = formatTime(this.audioElement.duration)
            }
            
            /* Convert seconds in minutes, (finding on Internet) */
            function formatTime(seconds)
            {
                let minutes = Math.floor(seconds / 60)
                minutes = (minutes >= 10) ? minutes : "0" + minutes;
                seconds = Math.floor(seconds % 60)
                seconds = (seconds >= 10) ? seconds : "0" + seconds
                return `${minutes} : ${seconds}`
            }
        })

        seekBarElement.addEventListener('click', (_event) => 
        {
            const ratio = (_event.clientX - bounding.left) / bounding.width
            const time = ratio * this.audioElement.duration

            this.audioElement.currentTime = time
        }) 

        dragElement.addEventListener('mousedown', (_event) => 
        {
            isdraged = true
            const ratio = (_event.clientX - bounding.left) / bounding.width
            dragElement.style.transform = `translateX(${ratio}px)`
        }) 

        dragElement.addEventListener('mousemove', (_event) => 
        {
            if (isdraged == true)
            {
                const ratio = (_event.clientX - bounding.left) / bounding.width
                dragElement.style.transform = `translateX(${ratio}px)`
            }   
        }) 

        dragElement.addEventListener('mouseup', (_event) =>
        {
            if (isdraged == true) 
            {
                const ratio = (_event.clientX - bounding.left) / bounding.width
                dragElement.style.transform = `translateX(${ratio}px)`
                const time = ratio * this.audioElement.duration
                this.audioElement.currentTime = time
                isdraged = false
            }
        })
    }
}

const jukeBox = new JukeBox(document.querySelector('.js-main'))