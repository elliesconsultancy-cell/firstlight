<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<svelte:head><title>Log in</title></svelte:head>

<div class="auth">
	<div class="card">
		<span class="eyebrow">Welcome back</span>
		<h1>Log in</h1>
		{#if form?.error}<p class="alert alert-error" role="alert">{form.error}</p>{/if}
		<form method="POST" use:enhance>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" name="password" type="password" autocomplete="current-password" required />
			</div>
			<button class="btn" style="width: 100%" type="submit">Log in</button>
		</form>
		<p class="muted small" style="margin-top: 18px">
			New here? <a href="/register">Create an account</a>. Forgot your password? Ask your instructor to reset it.
		</p>
	</div>
</div>

<style>
	.auth {
		min-height: calc(100vh - 140px);
		display: grid;
		place-items: center;
		padding: 40px 20px;
	}
	.card {
		width: 100%;
		max-width: 430px;
		padding: 32px;
	}
	h1 {
		font-size: 2.2rem;
	}
</style>
