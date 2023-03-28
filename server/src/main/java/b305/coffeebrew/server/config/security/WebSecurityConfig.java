package b305.coffeebrew.server.config.security;

import b305.coffeebrew.server.config.security.filter.GlobalFilter;
import b305.coffeebrew.server.config.security.handler.OAuth2SuccessHandler;
import b305.coffeebrew.server.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

	private final GlobalFilter globalFilter;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;

	@Order(0)
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers("/sign"
				, "/swagger-ui.html",
				"/v2/api-docs",
				"/swagger-resources/**",
				"/webjars/**",
				"/swagger/**");
	}

	@Bean
	public SecurityFilterChain securityConfig(HttpSecurity http) throws Exception {
		http.httpBasic().disable().csrf().disable().cors().and().formLogin().disable()
				.logout()
				.logoutUrl(globalFilter.getLogoutURL())
				.deleteCookies(globalFilter.getSessionId())
				.addLogoutHandler(globalFilter.logoutHandler())
				.logoutSuccessHandler(globalFilter.logoutSuccessHandler())
				.and()
//                .addFilterBefore(globalFilter.corsFilter(), CorsFilter.class)
				.addFilterBefore(globalFilter.authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(globalFilter.authorizationFilter(), BasicAuthenticationFilter.class)
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeRequests()
				.antMatchers(globalFilter.getPermitAll()).permitAll()
//                .antMatchers("/api/**").authenticated()
				.antMatchers("/api/**").permitAll()
				.and()
				.oauth2Login()
				.successHandler(oAuth2SuccessHandler)
				.userInfoEndpoint() // oauth2Login 성공 이후의 설정을 시작
				.userService(customOAuth2UserService); // 로그인  성공 후 customOAuth2UserService에서 설정 처리
		return http.build();
	}
}