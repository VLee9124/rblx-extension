API_URL = 'https://bnhcsabaaagprnsbiqaj.supabase.co/rest/v1/reports'
;(async function extension() {
    const match = location.pathname.match(/^\/users\/(\d+)\/profile/)
    if (!match) return
    const userId = match[1]

    const container = document.createElement('div')
    container.id = 'rbx-report-container'
    container.className = 'flex flex-col space-x-2'
    container.innerHTML = `
    <div id="rbx-msg" class="text-sm"></div>
    <button id="rbx-submit" class="MuiButtonBase-root MuiButton-root web-blox-css-tss-1aszub1-Typography-buttonMedium MuiButton-outlined web-blox-css-tss-rfowt4-Button-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-root web-blox-css-tss-1aszub1-Typography-buttonMedium MuiButton-outlined web-blox-css-tss-rfowt4-Button-outlined MuiButton-outlinedSecondary MuiButton-sizeMedium MuiButton-outlinedSizeMedium web-blox-css-mui-1xhf9yt-Typography-button">
      Submit Report
    </button>
    `

    const headerBtns = document.getElementsByClassName(
        'profile-header-buttons'
    )[0]
    headerBtns.insertAdjacentElement('afterbegin', container)

    document
        .getElementById('rbx-submit')
        .addEventListener('click', async () => {
            const msgEl = document.getElementById('rbx-msg')
            msgEl.textContent = ''

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaGNzYWJhYWFncHJuc2JpcWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjIyMzMsImV4cCI6MjA2MjczODIzM30.GV1f-VxyAbGIteM2ZfDPAFGFRTsa7m6A73Yus6BhZCA',
                        // Authorization: 'Bearer YOUR_ANON_KEY',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        label: 'NSFW Avatar',
                    }),
                })

                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                msgEl.style.color = 'green'
                msgEl.textContent = 'Report submitted successfully!'
            } catch (error) {
                msgEl.style.color = 'red'
                msgEl.textContent = 'Submission failed. Please try again.'
                console.error('Error:', error)
            }
        })
})()
