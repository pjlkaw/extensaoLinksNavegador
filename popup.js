async function obterLink() {
    try{
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const urlAtual = tab.url;
        return urlAtual
    }
    catch {
        return window.location.href
    }
}

const modal = document.getElementById('modal')

let index = 0
while (localStorage.getItem(`link-${index}`)) {
    index++
}

document.getElementById('createLink').addEventListener("click",async () => {
    modal.style.display = 'flex'
})

document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        event.currentTarget.style.display = 'none'
    }
})

document.getElementById('saveLink').addEventListener("click", async () => {
    const jsonLink = {
        name: document.getElementById('linkName').value || 'Sem nome',
        url: await obterLink()
    }

    localStorage.setItem(`link-${index++}`, JSON.stringify(jsonLink))
    arrayLinks()
    document.getElementById('linkName').value = ''
    modal.style.display = 'none'
})

function arrayLinks() {
    const parentTag = document.getElementById('linkList')
    parentTag.innerHTML = ''

    for (let i = 0; i < index; i++) {
        const storedLink = localStorage.getItem(`link-${i}`)
        if (!storedLink) continue

        const getLink = JSON.parse(storedLink)
        const child = document.createElement('li')

        child.className = "arraylink"
        child.innerHTML = `<a href="${getLink.url}" target="_blank">${getLink.name}</a><button class="delete-btn" id="delete-${i}">X</button>`

        parentTag.appendChild(child)

        document.getElementById(`delete-${i}`).addEventListener("click", () => {
            localStorage.removeItem(`link-${i}`)
            arrayLinks()
        })
    }
}

arrayLinks()


const themesArray = {
    light: {
        background: '#fafafa',
        text: '#111113',
        border: '#e4e4e7', surface: '#ffffff', input: '#fafafa', primary: '#111113', primaryHover: '#27272a', mutedHover: '#f4f4f5'
    },
    dark: {
        background: '#111113',
        text: '#ffffff',
        border: '#27272a', surface: '#18181b', input: '#18181b', primary: '#3f3f46', primaryHover: '#52525b', mutedHover: '#27272a'
    },
    coffee: {
        background: '#4b3832',
        text: '#fffaf0',
        border: '#3e2723', 
        surface: '#5b443d', 
        input: '#5b443d', 
        primary: '#2f211d', 
        primaryHover: '#241915', 
        mutedHover: '#684f46'
    },
    purple: {
        background: '#4b0082',
        text: '#e6e6fa',
        border: '#3a0050', 
        surface: '#5a1690', 
        input: '#5a1690', 
        primary: '#31005a', 
        primaryHover: '#270049', 
        mutedHover: '#64219a'
    },
    pink: {
        background: '#FC3B7F',
        text: '#FEF1CF',
        border: '#FEF1CF', 
        surface: '#FC3B7F', 
        input: '#FC3B7F', 
        primary: '#0032A8', 
        primaryHover: '#0032A8', 
        mutedHover: '#FC3B7F'
    },
    ocean: {
        background: '#e0f2fe', text: '#0c2d48', border: '#bae6fd',
        surface: '#f0f9ff', input: '#ffffff', primary: '#0369a1',
        primaryHover: '#075985', mutedHover: '#cfeefa'
    },
    forest: {
        background: '#14231b', text: '#e5f2e9', border: '#294536',
        surface: '#1d3327', input: '#1d3327', primary: '#2f6b46',
        primaryHover: '#3b8057', mutedHover: '#294536'
    },
    sunset: {
        background: '#fff1e6', text: '#4a2511', border: '#f5c9a8',
        surface: '#fff8f2', input: '#ffffff', primary: '#c2410c',
        primaryHover: '#9a3412', mutedHover: '#ffe1cc'
    },
    lavender: {
        background: '#f5f3ff', text: '#312e5b', border: '#ddd6fe',
        surface: '#ffffff', input: '#faf9ff', primary: '#6d5bd0',
        primaryHover: '#5846b8', mutedHover: '#e9e4ff'
    },
    mint: {
        background: '#e8f7f1', text: '#123b32', border: '#b9e4d4',
        surface: '#f5fcf9', input: '#ffffff', primary: '#087f5b',
        primaryHover: '#066649', mutedHover: '#d2f0e3'
    },
    midnight: {
        background: '#101827', text: '#e6edf7', border: '#29364a',
        surface: '#182438', input: '#182438', primary: '#365b8c',
        primaryHover: '#426da5', mutedHover: '#26364d'
    }
}

function applyTheme(themeName) {
    const selectedTheme = themesArray[themeName] ? themeName : 'light'
    const colors = themesArray[selectedTheme]
    const root = document.documentElement

    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--text', colors.text)
    root.style.setProperty('--border', colors.border)
    root.style.setProperty('--surface', colors.surface)
    root.style.setProperty('--input', colors.input)
    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--primary-hover', colors.primaryHover)
    root.style.setProperty('--muted-hover', colors.mutedHover)
    document.getElementById('themeSelect').value = selectedTheme
    localStorage.setItem('theme', selectedTheme)
}

document.getElementById('themeSelect').addEventListener('change', (event) => {
    applyTheme(event.target.value)
})

applyTheme(localStorage.getItem('theme') || 'light')
