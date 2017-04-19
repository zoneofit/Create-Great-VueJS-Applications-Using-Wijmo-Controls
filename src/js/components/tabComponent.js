export default {
	tabs: {
		template: `
			<div>
				<div class="tabs">
				  <ul>
				    <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
				    	<a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
				    </li>
				  </ul>
				</div>
				
				<div class="columns">
					<div class="column is-12">
						<slot></slot>
					</div>
				</div>
			</div>
		`,

		data() {
			return { tabs: [] }
		},

		methods: {
			selectTab(selectedTab) {
				this.tabs.forEach(tab => {
					tab.isActive = (tab.name == selectedTab.name)
				})
			}
		},

		mounted() {
			this.tabs = this.$children
		}
	},

	tab: {
		template: `
			<div v-if="isActive"><slot></slot></div>
		`,

		props: {
			name: { required: true },
			selected: { default: false }
		},

		data() {
			return {
				isActive: false
			}
		},

		computed: {
			href() {
				return '#' + this.name.toLowerCase().replace(/ /g, '-')
			}
		},

		mounted() {
			this.isActive = this.selected
		}
	}
}