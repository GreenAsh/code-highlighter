import {default as highlighter} from 'code-highlighter/prism'
import {ThemeContext} from "./code-highlighter/prism/themes/interfaces";
import {themeRegistry} from "./code-highlighter/prism/themes";

ThemeContext.getInstance().currentTheme = themeRegistry.getTheme('okaida');
highlighter.highlight('java', `package org.springframework.boot.actuate.cache;

/**
 * test
 */
@EndpointWebExtension(endpoint = CachesEndpoint.class)
public class CachesEndpointWebExtension {

    private final CachesEndpoint delegate;

    public CachesEndpointWebExtension(CachesEndpoint delegate) {
        this.delegate = delegate;
    }

    @ReadOperation
    public WebEndpointResponse<CacheEntry> cache(@Selector String cache, @Nullable String cacheManager) {
        try {
            CacheEntry entry = this.delegate.cache(cache, cacheManager);
            int status = (entry != null) ? WebEndpointResponse.STATUS_OK : WebEndpointResponse.STATUS_NOT_FOUND;
            return new WebEndpointResponse<>(entry, status);
        }
        catch (NonUniqueCacheException ex) {
            return new WebEndpointResponse<>(WebEndpointResponse.STATUS_BAD_REQUEST);
        }
    }

    @DeleteOperation
    public WebEndpointResponse<Void> clearCache(@Selector String cache, @Nullable String cacheManager) {
        try {
            boolean cleared = this.delegate.clearCache(cache, cacheManager);
            int status = (cleared ? WebEndpointResponse.STATUS_NO_CONTENT : WebEndpointResponse.STATUS_NOT_FOUND);
            return new WebEndpointResponse<>(status);
        }
        catch (NonUniqueCacheException ex) {
            return new WebEndpointResponse<>(WebEndpointResponse.STATUS_BAD_REQUEST);
        }
    }
}`).then(value => console.log(value)).catch(reason => console.error(reason));