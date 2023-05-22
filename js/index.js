
document.addEventListener("DOMContentLoaded", () => {
    const searchResult = document.getElementById('github-form')
    
    searchResult.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('search')
    
        fetch(`https://api.github.com/users/${user.value}`)
        .then(response => response.json())
        .then(function(userData) {
            let card = document.createElement('div')
            card.innerHTML= `
            <h3 id="user_login">${userData.login}</h3>
            <a href=${userData.html_url}>Link to GitHub</a>
            <br></br>
            <button id="display_repo">Display Repos</button>
            <br></br>
            <img src=${userData.avatar_url}>`
            
            const container = document.getElementById('github-container')
            container.innerHTML = "";
            container.append(card);
            const repoLink = document.getElementById('display_repo')
            repoLink.addEventListener("click", (e) => {
                const repoList = document.createElement('ul')
                card.append(repoList)
                fetch(`https://api.github.com/users/${user.value}/repos`)
                .then(response => response.json())
                .then(function(repos) {
                
                    repos.forEach(singleRepo => {
                        const repoItem = document.createElement('li')
                        repoItem.textContent = singleRepo.name
                        repoList.appendChild(repoItem)
                    })
                })
                
                
            })
        })
    })
    })