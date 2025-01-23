"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, MessageSquare, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Campaigns",
    value: "24",
    change: "4 active campaigns"
  },
  {
    title: "Email Subscribers",
    value: "12,453",
    change: "+234 this month"
  },
  {
    title: "Average Open Rate",
    value: "24.8%",
    change: "+2.3% from last month"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8% from last month"
  }
]

const campaigns = [
  {
    id: "CAM001",
    name: "Summer Sale 2024",
    type: "Email",
    status: "Active",
    sent: "12,453",
    opened: "6,234",
    clicks: "1,234",
    conversions: "234"
  },
  {
    id: "CAM002",
    name: "New Product Launch",
    type: "Social",
    status: "Scheduled",
    sent: "-",
    opened: "-",
    clicks: "-",
    conversions: "-"
  },
  // Add more campaigns as needed
]

export default function MarketingPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Marketing</h1>
          <p className="text-sm text-gray-500">Manage your marketing campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" /> Send Newsletter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500">{campaign.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === "Active" ? "success" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sent}</TableCell>
                      <TableCell>{campaign.opened}</TableCell>
                      <TableCell>{campaign.clicks}</TableCell>
                      <TableCell>{campaign.conversions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4">
                  <MessageSquare className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create your first automation</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                  Automate your marketing workflows to save time and increase engagement
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Grow your subscriber list</h3>
                <p className="text-sm text-gray-500 text-center max-w-md mb-4">
                  Create signup forms and landing pages to collect subscribers
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create Signup Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-6">
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                Analytics Dashboard Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
