<script>
    import { Router } from '@sveltech/routify';
    import { routes } from '@sveltech/routify/tmp/routes';
</script>

<style>
    img {
        height: 30px;
    }
    header {
        z-index: 100;
        width: 100%;
        height: 50px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        background: #141414;
        color: white;
    }

    h1 {
        margin: 0 0 0 15px;
        font-size: 20px;
    }
</style>

<header>
    <a href="/">
        <img src="/img/logo.svg" alt="" />
    </a>
    <h1>Compute</h1>
    <p>, picturing mathematics.</p>
</header>
<Router {routes} />
