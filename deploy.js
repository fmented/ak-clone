
import {publish} from 'gh-pages'

publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/fmented/ak-clone.git', // Update to point to your repository  
        user: {
            name: 'fmented', // update to use your name
            email: 'fmented@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)