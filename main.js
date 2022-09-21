// NavBar
const header = document.createElement('div')
header.innerHTML += `
    <header class="relative flex items-center justify-center h-screen overflow-hidden">
    <div class="relative z-20 p-5 text-white backdrop-brightness-50">
      <h1 class="text-8xl">Valorant Agents</h1>
      <p class="text-center">scroll down to view agents</p>
    </div>
    <video autoplay loop muted class="absolute z-10 w-auto min-w-full min-h-full max-w-none brightness-50">
      <source src="assets/videoplayback.mp4" type="video/mp4" />Your browser does not support the video tag.
    </video>
    </header>
    `
document.body.appendChild(header)

// Card Container
const mainContainer = document.createElement('div')
mainContainer.className = 'character-container'
document.body.appendChild(mainContainer)

const loadCharacters = async () => {
  try {
      const res = await fetch("https://valorant-api.com/v1/agents")
      const result = await res.json()
      displayCharacters(result.data)
  } catch(err) {
      console.log(err)
  }
}

loadCharacters()

const characterCard = document.querySelector('.character-container')

const displayCharacters = (agents) => {
  const htmlString = agents.map((agent) => {
    return `
      <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center justify-center overflow-hidden">
      <div class="container mx-auto px-6 flex relative py-16">
          <div class="sm:w-2/3 lg:w-2/5 flex flex-col justify-center relative z-20">
              <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
              </span>
              <h1 class="uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                  ${agent.displayName}
                  <span class="text-5xl sm:text-5xl mb-4">
                    ${agent.developerName}
                  </span>
              </h1>
              <p class="text-sm sm:text-base text-gray-700 dark:text-white">
                  ${agent.description}
              </p>
              <div class="flex mt-8 justify-center">
                  <a href="#" class="uppercase py-4 px-2 rounded-sm bg-transparent border-2 border-red-500 text-red-500 dark:text-white hover:text-white text-md">
                     ${agent.abilities[3].displayName}
                  </a>
                  <img src="${agent.abilities[3].displayIcon}" class="h-14 w-14 max-w-xs md:max-w-sm ml-4"/> 
              </div>
          </div>
          <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
              <img src="${agent.fullPortrait}" class=""/>
          </div>
      </div>
    </div>
    `
  })
  .join('')
  characterCard.innerHTML = htmlString
}