// SPDX-License-Identifier: MIT

// 自定义的主题
export const themes: { [name: string]: Theme } = {
    purple: {
        dark: {
            primary: '#673ab7',
            secondary: '#9c27b0',
            accent: '#f44336'
        },
        light: {
            primary: '#673ab7',
            secondary: '#9c27b0',
            accent: '#f44336'
        }
    },

    green: {
        dark: {
            primary: '#4caf50',
            secondary: '#8bc34a',
            accent: '#009688'
        },
        light: {
            primary: '#4caf50',
            secondary: '#8bc34a',
            accent: '#009688'
        }
    }
};

// 是否默认启用深色模式，默认情况下采用系统的相同设置。
export const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

interface Theme {
    dark: Colors
    light: Colors
}

interface Colors {
    primary: string
    secondary: string
    accent: string
    info?: string
    warning?: string
    error?: string
    success?: string
    anchor?: string
}
