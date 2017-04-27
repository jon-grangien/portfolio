import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'

const AppHeader = (props) => {
  console.log(props)
	const label = props.adminView ? 'JG ADMIN' : 'JG'
  const cIndex = props.adminView ? 'neutral-1' : 'neutral-2'

  return (
	<Header size="medium"
					fixed
					colorIndex={cIndex}
					justify="between"
					pad={{ horizontal: 'medium', vertical: 'none' }}>
		<Title>
			<Anchor path="/" label={label} />
		</Title>
		<Box pad={{ horizontal: 'small', vertical: 'none' }}>
			<Menu inline
						responsive
						direction="row">
				<Anchor path="/" label="ABOUT" />
				<Anchor path="/projects" label="PROJECTS" />
				<Menu inline={false}
							label="ADMIN"
							responsive>
          <Anchor path="/admin/newproject" label="ADD PROJECT" />
					<Anchor path="/admin/manageprojects" label="MANAGE PROJECTS" />
				</Menu>
			</Menu>
		</Box>
	</Header>
	)
}

AppHeader.propTypes = {
	adminView: PropTypes.bool,
}

AppHeader.defaultProps = {
  adminView: false,
}

const mapState = state => ({
	adminView: state.appHeaderAdminView
})

export default connect(mapState, null)(AppHeader)