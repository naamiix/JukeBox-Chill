class JukeBox
{
    constructor(_element)
    {
        this.element = _element
        this.audioElement = this.element.querySelector('.js-audio-music')
        this.soundElement = this.element.querySelector('.js-audio-sound')
        this.songCovers = this.element.querySelectorAll('.js-songCover')
        this.songElements = ["sounds/caravan-palace-lone-digger.mp3", "sounds/caravan-palace-miracle.mp3", "sounds/caravan-palace-dramophone.mp3", "sounds/caravan-palace-plume.mp3", "sounds/caravan-palace-rock-it-for-me.mp3", "sounds/caravan-palace-wonderland.mp3", "sounds/ours-samplus-le-parjure.mp3", "sounds/ours-samplus-like-the-sunshine.mp3", "sounds/ours-samplus-swingapour.mp3", "sounds/ours-samplus-trouble.mp3"]
         
        this.nameSongElement = ["Lone Digger - Caravan Palace", "Miracle - Caravan Palace", "Dramophone - Caravan Palace", "Plume - Caravan Palace", "Rock It For Me - Caravan Palace", "Wonderland - Caravan Palace", "Le Parjure - Ours Samplus", "Like The Sun Shine - Ours Samplus", "Swingapour - Ours Samplus", "Trouble - Ours Samplus"]
        this.activeSong = Math.floor(Math.random()*(this.songElements.length - 1))
         

        this.setPlayPause()
        this.changeSong()
        /*this.setVolume()
        this.setSeekBar()*/
    }

    setPlayPause()
    {
        this.audioElement.src = this.songElements[this.activeSong]
        //Play
        const playElement = this.element.querySelector('.js-playButton')
        console.log(playElement)
        playElement.addEventListener('click', () =>
        {
            this.soundElement.play()
            setTimeout(() => 
            {
                this.audioElement.play()
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
            console.log(this.audioElement)
            playElement.style.opacity = 1
            playElement.style.zIndex = 2
        })
    }

    changeSong()
    {
        //Back Song
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

    /*
    setVolume()
    {
        const volumeUpElement = this.element.querySelector('.js-volume-up')
        const volumeDownElement = this.element.querySelector('.js-volume-down')

        volumeUpElement.addEventListener('click', () =>
        {
            this.videoElement.volume =  Math.min(this.videoElement.volume + 0.1, 1)
        })

        volumeDownElement.addEventListener('click', () =>
        {
            this.videoElement.volume = Math.max(this.videoElement.volume - 0.1, 0)
        })
    }
    */
    
    /*
    setSeekBar()
    {
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const fillElement = seekBarElement.querySelector('.js-seek-bar-fill')
        
        this.videoElement.addEventListener('timeupdate', () =>
        {
            const ratio = this.videoElement.currentTime / this.videoElement.duration
            fillElement.style.transform = `scaleX(${ratio})`
        })

        seekBarElement.addEventListener('click', (_event) => 
        {
            const bounding = seekBarElement.getBoundingClientRect()
            const ratio = (_event.clientX - bounding.left) / bounding.width
            const time = ratio * this.videoElement.duration

            this.videoElement.currentTime = time
        }) 

    }
    */


}

const jukeBox = new JukeBox(document.querySelector('.js-main'))