package com.project.weblog.common.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * @date: 2023-08-22 16:52
 * @description: Mybatis Plus 配置文件
 **/
@Configuration
@MapperScan("com.project.weblog.common.domain.mapper")
public class MybatisPlusConfig {
}
