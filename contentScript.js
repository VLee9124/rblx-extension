API_URL = 'https://bnhcsabaaagprnsbiqaj.supabase.co/rest/v1/reports'
;(async function extension() {
    const match = location.pathname.match(/^\/users\/(\d+)\/profile/)
    if (!match) return
    const userId = match[1]

    const container = document.createElement('div')
    container.id = 'rbx-report-container'
    container.className =
        'fixed flex flex-col top-10 right-10 bg-white shadow-lg rounded-sm p-4 space-y-3 w-64 z-50'
    container.innerHTML = `
    <label class="block font-medium text-gray-700 font-bold">
      Report user:
    </label>
    <div id="rbx-labels" class="space-y-2 flex flex-col">
      <label class="inline-flex items-center">
        <input type="checkbox" value="Cheating" class="form-checkbox text-indigo-600" />
        <span class="ml-2 text-gray-700">Cheating</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" value="Abusive" class="form-checkbox text-indigo-600" />
        <span class="ml-2 text-gray-700">Abusive</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" value="Spam" class="form-checkbox text-indigo-600" />
        <span class="ml-2 text-gray-700">Spam</span>
      </label>
      <label class="inline-flex items-center">
        <input type="checkbox" value="Other" class="form-checkbox text-indigo-600" />
        <span class="ml-2 text-gray-700">Other</span>
      </label>
    </div>
    <button id="rbx-submit" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      Submit Report
    </button>
    <div id="rbx-msg" class="text-sm"></div>
  `
    document.body.appendChild(container)

    // 3) Handle submit

    document
        .getElementById('rbx-submit')
        .addEventListener('click', async () => {
            const msgEl = document.getElementById('rbx-msg')
            msgEl.textContent = ''

            const checked = Array.from(
                container.querySelectorAll('input[type="checkbox"]:checked')
            ).map((el) => el.value)

            if (checked.length === 0) {
                msgEl.style.color = 'red'
                msgEl.textContent = 'Please select at least one label.'
                return
            }

            const label = checked.join(', ')

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaGNzYWJhYWFncHJuc2JpcWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjIyMzMsImV4cCI6MjA2MjczODIzM30.GV1f-VxyAbGIteM2ZfDPAFGFRTsa7m6A73Yus6BhZCA',
                        // Authorization: 'Bearer YOUR_ANON_KEY',
                    },
                    body: JSON.stringify({ user_id: userId, label }),
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
