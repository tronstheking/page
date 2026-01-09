
document.addEventListener('DOMContentLoaded', () => {
    const portfolioFolders = document.querySelector('#portfolio-folders');
    const portfolioGrid = document.querySelector('#portfolio-grid');
    const portfolioActions = document.querySelector('#portfolio-actions');
    const backToFoldersBtn = document.querySelector('.back-to-folders');
    const folderCards = document.querySelectorAll('.folder-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const isMobile = window.innerWidth < 1024;

    let isTransitioning = false;

    window.showFolderContents = (category) => {
        if (isTransitioning) return;
        isTransitioning = true;

        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });

        if (portfolioFolders) portfolioFolders.classList.add('hidden');
        if (portfolioGrid) portfolioGrid.classList.remove('hidden');
        if (portfolioActions) portfolioActions.style.display = 'block';

        let visibleIndex = 0;
        portfolioCards.forEach((card) => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                if (isMobile) {
                    card.style.animation = 'none';
                    card.style.opacity = '1';
                } else {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards ${visibleIndex * 0.05}s`;
                    }, 10);
                }
                visibleIndex++;
            } else {
                card.style.display = 'none';
            }
        });

        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        }

        setTimeout(() => { isTransitioning = false; }, 300);
    };

    window.showFolders = () => {
        if (isTransitioning) return;
        isTransitioning = true;

        if (portfolioFolders) portfolioFolders.classList.remove('hidden');
        if (portfolioGrid) portfolioGrid.classList.add('hidden');
        if (portfolioActions) portfolioActions.style.display = 'none';

        filterButtons.forEach(btn => btn.classList.remove('active'));
        if (filterButtons[0]) filterButtons[0].classList.add('active');

        if (!isMobile) {
            folderCards.forEach((folder, index) => {
                folder.style.animation = 'none';
                setTimeout(() => {
                    folder.style.animation = `folderEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards ${index * 0.05}s`;
                }, 10);
            });
        }

        setTimeout(() => { isTransitioning = false; }, 300);
    };

    folderCards.forEach(folder => {
        folder.addEventListener('click', () => {
            const category = folder.getAttribute('data-category');
            window.showFolderContents(category);
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const val = button.getAttribute('data-filter');
            if (val === 'all') window.showFolders();
            else window.showFolderContents(val);
        });
    });

    if (backToFoldersBtn) {
        backToFoldersBtn.addEventListener('click', () => {
            window.showFolders();
        });
    }

    window.showFolders();
});
