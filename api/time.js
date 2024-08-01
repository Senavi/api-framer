export default {
  async fetch(request, env, ctx) {
      
      const data = await fetch("https://api.fetch.tools/status")
      const serverStatus = await data.json()

      // CORS Headers
      const headers = new Headers()
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
      headers.set('Access-Control-Allow-Headers', 'Content-Type')

      const responseData = JSON.stringify(serverStatus)

      return new Response(responseData, { headers })
  }
}
