<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
</script>

<svelte:head><title>Join the course</title></svelte:head>

<div class="auth">
	<div class="card">
		{#if data.firstUser}
			<span class="eyebrow">First-time setup</span>
			<h1>Create the instructor account</h1>
			<p class="muted">This first account will be the instructor (you). Students will sign up after you.</p>
		{:else}
			<span class="eyebrow">Start learning</span>
			<h1>Join the course</h1>
			<p class="muted">It’s free. Create an account to get your weekly lessons and track your progress.</p>
		{/if}
		{#if form?.error}<p class="alert alert-error" role="alert">{form.error}</p>{/if}
		<form method="POST" use:enhance>
			<div class="field">
				<label for="name">Full name</label>
				<input id="name" name="name" type="text" autocomplete="name" required value={form?.name ?? ''} />
			</div>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" required value={form?.email ?? ''} />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required />
				<p class="hint">At least 8 characters.</p>
			</div>
			{#if data.needsCode}
				<div class="field">
					<label for="code">Invite code</label>
					<input id="code" name="code" type="text" required value={form?.code ?? ''} />
					<p class="hint">Your instructor will give you this.</p>
				</div>
			{/if}
			<button class="btn btn-sun" style="width: 100%" type="submit">
				{data.firstUser ? 'Create instructor account' : 'Create my account'}
			</button>
		</form>
		<p class="muted small" style="margin-top: 18px">Already have an account? <a href="/login">Log in</a></p>
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
		max-width: 460px;
		padding: 32px;
	}
	h1 {
		font-size: 2.1rem;
	}
</style>
