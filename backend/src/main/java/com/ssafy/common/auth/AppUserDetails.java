package com.ssafy.common.auth;

import com.ssafy.db.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AppUserDetails implements UserDetails {
    User appUser;
    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();

    public AppUserDetails(User appUser) {
        super();
        this.appUser = appUser;
    }

    public User getAppUser() {
        return this.appUser;
    }
    @Override
    public String getPassword() {
        return null;
    }
    @Override
    public String getUsername() {
        return this.appUser.getEmail();
    }
    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }
    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialNonExpired;
    }
    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }
    public void setAuthorities(List<GrantedAuthority> roles) {
        this.roles = roles;
    }
}
