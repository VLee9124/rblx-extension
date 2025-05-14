;(async function extension() {
    // 1) Extract userId from URL
    const match = location.pathname.match(/^\/users\/(\d+)\/profile/)
    if (!match) return
    const userId = match[1]

    // 2) Create the UI container
    const container = document.createElement('div')
    container.id = 'rbx-report-container'
    container.innerHTML = `
    <label for="rbx-labels">Report user:</label>
    <select id="rbx-labels">
      <option value="">-- choose a reason --</option>
      <option value="Inappropriate Avatar">Cheating</option>
      <option value="Inappropriate Name">Abusive</option>
      <option value="Spam">Spam</option>
      <option value="Other">Other</option>
    </select>
    <button id="rbx-submit">Submit Report</button>
    <div id="rbx-msg" style="margin-top:6px;font-size:0.9em;color:green;"></div>
  `
    document.body.appendChild(container)

    // 3) Handle submit
    document
        .getElementById('rbx-submit')
        .addEventListener('click', async () => {
            const select = document.getElementById('rbx-labels')
            const label = select.value
            const msgEl = document.getElementById('rbx-msg')
            msgEl.textContent = ''

            if (!label) {
                msgEl.style.color = 'red'
                msgEl.textContent = 'Please select a reason.'
                return
            }

            // 4) POST to your backend
            try {
                const res = await fetch(
                    'https://bnhcsabaaagprnsbiqaj.supabase.co/rest/v1/reports',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaGNzYWJhYWFncHJuc2JpcWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjIyMzMsImV4cCI6MjA2MjczODIzM30.GV1f-VxyAbGIteM2ZfDPAFGFRTsa7m6A73Yus6BhZCA',
                            // Authorization: 'Bearer YOUR_ANON_KEY',
                        },
                        body: JSON.stringify({ user_id: userId, label }),
                    }
                )

                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                msgEl.style.color = 'green'
                msgEl.textContent = 'Report submitted!'
            } catch (err) {
                msgEl.style.color = 'red'
                msgEl.textContent = 'Submission failed.'
                console.error('Report error:', err)
            }
        })
})()
