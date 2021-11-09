## Code syntax highlighting Miro Plugin
Code syntax highlighting plugin for miro.com.

<a target="_blank" href="https://miro.com/oauth/authorize/?response_type=code&client_id=3074457347020676712&redirect_uri=%2Fconfirm-app-install%2F">Install</a>

<a target="_blank" href="https://miro-code-highlighter.glitch.me/install.html">Installation page</a>

### FAQ/Problems

#### Security / Data Sharing

The plugin doesn't collect any widget data. All of the transformations happen on the client-side at the current browser (user) session.

I haven't checked `node` (`package`) dependencies attentively yet, only by `npm` recommendations, but I think (hope) all should be ok from the security side.

The plugin collects errors and its stack traces and sends them to `sentry.io` for improvement purposes, no user data are being collected.
E.g. the worst thing which is being collected is size of widget text data when highlighted representation doesn't fit widget text limits. Smth like `Highlighted length: 7019 Cleaned length: 2490 Widget text length: 3012` is being sent to `sentry`.

All the plugin static files, which are being built by webpack, are located under `dist` derectory and published and served at `glitch.com`: https://miro-code-highlighter.glitch.me/install.html, `dist/*` files are available under `https://miro-code-highlighter.glitch.me/*`

#### Performance
> :warning: if you face a performance issue on the board, try to uninstall the plugin for yourself,
> reload the board, and if it helps will be nice if you report the bug
>
> The root cause could be widget menu buttons integration. Have changed behavior related to widgets menu buttons recently, haven't tested it yet for long, but I think it should solve the issues.

## How to use plugin

#### Highlight
Select widgets and press the plugin button
<img src="docs/img/help_highlight_selection.gif" />

#### Open settings
Click on the plugin button without selecting any widget
<img src="docs/img/help_open_settings.gif" width="100%" />

