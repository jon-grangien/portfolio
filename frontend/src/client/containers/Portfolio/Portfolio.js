import React from 'react'
import { connect } from 'react-redux'

import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Label from 'grommet/components/Label'
import Anchor from 'grommet/components/Anchor'
import Tiles from 'grommet/components/Tiles'
import Tile from 'grommet/components/Tile'
import Section from 'grommet/components/Section'

import { withRouter } from 'react-router-dom'

import { projectsEntityThunks } from '../../../shared/entities/Projects'
import AppBanner from '../../containers/AppBanner'

class Portfolio extends React.Component {
  componentWillMount() {
    this.props.getProjects()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectsById !== this.props.projectsById) {
      this.setState({projects: nextProps.projectsById})
    }
  }

  goToProject(seriesIdx) {
    // Get corresponding project id
    const { projects } = this.props
    const id = Object.values(projects)[seriesIdx].id

    // Redirect
    this.props.history.push(`/projects/${id}`)
  }

  render() {
    const { projects } = this.props

    return (
	<Box>
		<AppBanner large={false} />
		<Box pad="medium" align="center" textAlign="center">
			<Heading tag="h1" margin="none">Projects</Heading>
		</Box>
		{ Object.values(projects).length > 0 ? (
		  <Section pad="large" margin="large">
        <Tiles selectable={true} onSelect={ idx => this.goToProject(idx) }>
          { Object.values(projects).map(project => (
            <Tile key={project.id} pad="medium" >
              <Box pad="medium">
                <Heading tag="h2" margin="none">{project.title}</Heading>
                <Label margin="none">{project.short_desc}</Label>
              </Box>
            </Tile>
            )) }
        </Tiles>
      </Section>
      ) : (
					<Box pad="large" align="center" textAlign="center">
						<Label>There are no projects in the database.</Label>
					</Box>
				) }
	</Box>
    )
  }
}

const mapState = state => ({
  projects: state.projectsById
})

const mapDispatch = dispatch => ({
  getProjects: () => dispatch(projectsEntityThunks.getAllProjects())
})

export default connect(mapState, mapDispatch)(withRouter(Portfolio))

