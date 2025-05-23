import { loadAndRenderActivityTitle } from './components/activityTitle.js';
import { loadAndRenderRelationalSchema } from './components/relationalSchema.js';
import { loadAndRenderCoreTableList } from './components/tables/core/accordions.js';
import { loadAndRenderCoreTableData } from './components/tables/core/data.js';

import { initTabs } from './components/tabs.js';
import { initQueryExecution } from './components/tables/results.js';
import { initNotes } from './components/notes.js';
import { initTaskStrip } from './components/strips/tasks.js';
import { initFeedback } from './components/feedback.js';

import { TEMP_STARTING_ACTIVITY } from './utils/constants.js';
import { initSqlEditor } from './components/sqlEditor.js';

import { initLocalization } from './localization/initLocalization.js';
import { initStakeSystem } from './components/score/stakeSystem.js';
import { initScoreVisualEffects } from './components/score/visualEffects.js';
window.i18n.init().catch(err => console.error('Failed to initialize localization:', err));

document.addEventListener('DOMContentLoaded', async () => {
    // Reset the local storage for testing purposes. TODO: remove this line in production
    localStorage.clear();

    window.sqlEditor = initSqlEditor('sql-editor'); // before initLocalization

    initLocalization();

    await loadAndRenderActivityTitle();

    // Initialize core components: tabs, query handling, and core tables
    initTabs();
    document.querySelector('.tab[data-tab="schema-tab"]').click();
    initQueryExecution();
    initNotes();

    // Initialize the task strip and simulate a click on the active button
    window.currentActivityNumber = TEMP_STARTING_ACTIVITY;
    window.taskStrip = await initTaskStrip();
    window.taskStrip.getActiveButton().click();
    window.stakeSystem = initStakeSystem(window.currentActivityNumber);
    window.scoreVisualEffects = initScoreVisualEffects();

    initFeedback();

    window.loadAndRenderCoreTableList = loadAndRenderCoreTableList;
    window.loadAndRenderCoreTableData = loadAndRenderCoreTableData;

    // Automatically load core tables on page load
    window.loadAndRenderCoreTableList();

    // Theme toggle handling
    const themeToggle = document.getElementById('toggle-theme');
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

    // Apply stored theme preference
    if (isDarkTheme) {
        document.querySelector('.moon-icon').classList.add('hidden');
        document.querySelector('.sun-icon').classList.remove('hidden');
    }
    await loadAndRenderRelationalSchema(isDarkTheme);

    // Toggle dark/light theme and save preference
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');

        // Save user preference
        localStorage.setItem('darkTheme', isDark);

        const moonIcon = document.querySelector('.moon-icon');
        const sunIcon = document.querySelector('.sun-icon');
        // Update icon based on theme
        if (isDark) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }

        // Reload relational schema with the new theme
        loadAndRenderRelationalSchema(isDark);
    });

    // hamburger menu handling
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuToggle && dropdownMenu) {
        // Toggle dropdown menu visibility on hamburger icon click
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent immediate closing
            dropdownMenu.classList.toggle('active');

            // Optional icon rotation for visual feedback
            menuToggle.style.transform = dropdownMenu.classList.contains('active')
                ? 'rotate(90deg)'
                : 'rotate(0)';
        });

        // Close the menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.hamburger-menu') && dropdownMenu.classList.contains('active')) {
                dropdownMenu.classList.remove('active');
                menuToggle.style.transform = 'rotate(0)';
            }
        });
    }
});




