import {default as highlighter} from 'code-highlighter/prism'
import {ThemeContext} from "./code-highlighter/prism/themes/interfaces";
import {themeRegistry} from "./code-highlighter/prism/themes";

ThemeContext.getInstance().currentTheme = themeRegistry.getTheme('default');
highlighter.highlight('java', `    /**
     * Checks if a specific {@link StackTraceElement} in the current thread's stacktrace
     * should cause devtools to be disabled.
     * @param thread the current thread
     * @return {@code true} if devtools should be enabled
     */
    public static boolean shouldEnable(Thread thread) {
        for (StackTraceElement element : thread.getStackTrace()) {
            if (isSkippedStackElement(element)) {
                return false;
            }
        }
        return true;
    }
`).then(value => console.log(value)).catch(reason => console.error(reason));