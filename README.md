# genpeeps
https://genpeeps.vercel.app

Leveraging LLMs with vision capabilities to automatically generate profile pictures in a notion-like 
"sketch" style using vector graphics from open-peeps. Rendered with opeeps.fun's React wrapper.

<img src="https://github.com/user-attachments/assets/61675464-3004-4a13-b78c-999a3ddac226" width="200" height="auto">

<img src="https://github.com/user-attachments/assets/ed51eab7-d528-4cb9-a25a-5c3f9afabd46" width="200" height="auto">

- [genpeeps](#genpeeps)
- [TODO](#todo)

## User Flow
Planned User Flow
1. user uploads image
2. ViT/foundation model is used to describe properties (hair style, gender, accessories, etc.)
3. LLM/foundation model picks the best react-peeps assets
4. user manually fine-tunes their avatar
5. user downloads svg avatar

## TODO
- [x] make frontend
- [x] prompting w/ sanity testing
- [ ] wrap microservice in flask
- [ ] make backend (maybe next.js or part of flask)
