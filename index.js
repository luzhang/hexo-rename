const fs = require('fs');

hexo.extend.console.register('rename', 'Rename all source files based on title', async function(){

    fs.readdir('source/_posts/',  (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        files.forEach( async (file) => {
            const content = await fs.readFileSync('source/_posts/' + file, 'utf8');
            const found = content.match(/title\:\s.+/g);
            let title = found[0].replace('title: ', '');
            title = title.replaceAll(/[\s，]+/g, '-').replace(',', '');

            if (file !== title + '.md') {
                fs.rename( 'source/_posts/' + file, 'source/_posts/' + title + '.md', (err) => {
                    if (err) throw err;
                    console.log(`source/_posts/${file} -> source/_posts/${title}.md`);
                });
            }
        });
    });
});
