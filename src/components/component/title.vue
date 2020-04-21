<template>
    
    <p class="title clearfix bor-b">
        <span class="line"></span>
        <span>{{title}}</span>
        <slot></slot>
    </p>
    
</template>
<script>
export default {
    props:['title']
}
</script>

