const PRISM = require('../prism.js');
const { highlightCode } = require('../code-highlighter.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(``);
const document = dom.window.document;

console.log(highlightCode(`package com.example.spring.demo.oauth.infrastructure.configurations;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

@AllArgsConstructor
@EnableResourceServer
@EnableGlobalMethodSecurity(
        prePostEnabled = true
)
@Configuration
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
    private final TokenStore tokenStore;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/api/**")
                .authorizeRequests().antMatchers("/api/**")
                .authenticated();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(tokenStore);
    }
}`, document, 'java'));

