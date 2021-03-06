class ProjectsController < ApplicationController
	before_action :set_project, only: [:show, :update, :destroy]

	acts_as_token_authentication_handler_for User, fallback: :none
	before_action :require_auth!, only: [:create, :update, :destroy]

	# GET /projects
  def index
    @projects = Project.all
    json_response(@projects)
  end

  # POST /projects
  def create
    @project = Project.create!(project_params)
    puts params

		@tags = params[:tags]
		@tags.each do |tag|
			@project.tags.create(:label => tag)
		end

    json_response(@project, :created)
  end

  # GET /projects/:id
  def show
    json_response(@project)
  end

  # PUT /projects/:id
  def update
    @project.update(project_params)

    @project.tags.destroy_all
		@tags = params[:tags]
		@tags.each do |tag|
			@project.tags.create(:label => tag)
		end

    head :no_content
  end

  # DELETE /projects/:id
  def destroy
    @project.destroy
    head :no_content
  end

  private

  def project_params
    # whitelist params
    params.permit(:title, :short_desc, :long_desc, :src_url, :app_url, :app_link_label, :primary_image_id, :projectteam, :other_images => [])
  end

  def set_project
    @project = Project.find(params[:id])
  end

	def require_auth!
		throw(:warden, scope: :user) unless current_user.presence
	end
end
